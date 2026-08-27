import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

CHANNELS = [
    {"name": "FuzeIII", "handle": "FuzeIII", "type": "Créateur"},
    {"name": "Fiouze", "handle": "Fiouze", "type": "Créateur"},
    {"name": "Paladium", "handle": "Paladium", "type": "Officiel"},
]
UA = "Mozilla/5.0 (compatible; PaladiumPriceCheck/1.1)"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()


def resolve_channel(handle):
    data = get(f"https://www.youtube.com/@{handle}")
    text = data.decode("utf-8", "ignore")
    m = re.search(r'"channelId":"(UC[\w-]+)"', text)
    return m.group(1) if m else None


def classify(title):
    t = title.lower()
    if any(x in t for x in ("rediff", "vod", "replay", "redif", "rediffusion")):
        return "Rediffusion"
    if any(x in t for x in ("live", "stream", "direct", "en direct")):
        return "Stream / Live"
    if "paladium" in t or "pala" in t:
        return "Paladium"
    return "Vidéo"


feed_path = Path("media-feed.json")
previous = {}
if feed_path.exists():
    try:
        previous = json.loads(feed_path.read_text(encoding="utf-8"))
    except Exception:
        previous = {}

items = []
for channel in CHANNELS:
    try:
        cid = resolve_channel(channel["handle"])
        if not cid:
            print(f"Skip {channel['name']}: channel not found")
            continue
        root = ET.fromstring(get(f"https://www.youtube.com/feeds/videos.xml?channel_id={cid}"))
        ns = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
        for entry in root.findall("a:entry", ns)[:12]:
            title = entry.findtext("a:title", default="", namespaces=ns)
            video_id = entry.findtext("yt:videoId", default="", namespaces=ns)
            published = entry.findtext("a:published", default="", namespaces=ns)
            if not video_id:
                continue
            items.append({
                "title": title,
                "url": f"https://www.youtube.com/watch?v={video_id}",
                "thumbnail": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
                "published": published,
                "channel": channel["name"],
                "sourceType": channel["type"],
                "kind": classify(title),
            })
    except Exception as exc:
        print(f"Skip {channel['name']}: {exc}")

# If every source is temporarily unavailable, preserve the last known good feed
# instead of replacing the site feed with an empty list.
if not items and previous.get("items"):
    payload = previous
    print("All media sources unavailable; keeping previous feed.")
else:
    seen = set()
    unique = []
    for item in sorted(items, key=lambda x: x["published"], reverse=True):
        if item["url"] not in seen:
            seen.add(item["url"])
            unique.append(item)
    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "items": unique[:30],
    }

feed_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(payload.get('items', []))} media items")
