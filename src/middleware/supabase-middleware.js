const {createClient} = require('@supabase/supabase-js')

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } 
  return null;
}

const supabase_middleware = async (req, res) => {
 
  const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY, {})
  const JWT = getToken(req)

  switch(JWT){
    case null:
      res.status(401).json({'error': 'Access Token not found'})
      break;
    default:
      
    const { data, error } = await supabase.auth.getUser(JWT);

      if(error){ 
        res.status(401).json(error) 
      }else{ 
        return data;
      }
      break;
  }
}

module.exports = supabase_middleware
