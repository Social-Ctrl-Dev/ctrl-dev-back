const {createClient} = require('@supabase/supabase-js')

// import dotenv from "dotenv";
// dotenv.config();

// const supabase = createClient(
//   process.env.SUPABASE_PROJECT_URL ?? "",
//   process.env.SUPABASE_API_KEY ?? ""
// );


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

}

module.exports = supabase_middleware