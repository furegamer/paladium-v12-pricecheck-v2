(async()=>{
  if(!location.pathname.endsWith('/admin.html')) return;

  const cfg=window.PRICECHECK_AUTH||{};
  if(!window.supabase||!cfg.supabaseUrl||!cfg.supabaseAnonKey){
    location.replace('profile.html');
    return;
  }

  try{
    const client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
    const {data:{session}}=await client.auth.getSession();

    if(!session?.user){
      location.replace('profile.html');
      return;
    }

    const {data:admin,error}=await client
      .from('admins')
      .select('user_id')
      .eq('user_id',session.user.id)
      .maybeSingle();

    if(error || !admin){
      location.replace('profile.html');
    }
  }catch(e){
    location.replace('profile.html');
  }
})();
