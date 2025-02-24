use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct Claims{
  sub : String,
  exp : usize,
}

pub fn create_jwt(user_id : &str) -> String {
  let secret = env::var("JWT_SECRET").expect("Please enter a valid JWT_SECRET in the .env file");
  let claims = Claims {
    sub : user_id.to_owned(),
    exp : 1000000000,
  };
  encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref())).unwrap()
}

pub fn verify_jwt(token : &str) -> Option<String> {
  let secret = env::var("JWT_SECRET").expect("Please enter a valid JWT_SECRET in the .env file");
  let decoded = decode::<Claims>(token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default());
  return  decoded.ok().map(|token_data| token_data.claims.sub);
}
