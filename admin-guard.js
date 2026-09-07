(function(){
  if(!location.pathname.endsWith('/admin.html')) return;

  const profile='profile.html';
  let redirected=false;
  const goProfile=()=>{
    if(!redirected){
      redirected=true;
      location.replace(profile);
    }
  };

  // Hide the admin UI while the permission check is running.
  document.documentElement.style.visibility='hidden';

  const cfg=window.PRICECHECK_AUTH||{};
  if(!window.supabase||!cfg.supabaseUrl||!cfg.supabaseAnonKey){
    goProfile();
    return;
  }

  (async()=>{
    try{
      const client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey,{
        auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
      });

      const {data,error}=await client.auth.getSession();
      if(error || !data?.session?.user){
        goProfile();
        return;
      }

      const {data:admin,error:adminError}=await client
        .from('admins')
        .select('user_id')
        .eq('user_id',data.session.user.id)
        .maybeSingle();

      if(adminError || !admin){
        goProfile();
        return;
      }

      document.documentElement.style.visibility='visible';
    }catch(e){
      goProfile();
    }
  })();
})();
