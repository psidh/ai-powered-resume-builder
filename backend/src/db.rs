use sqlx::{PgPool, postgres::PgPoolOptions};
use std::env;
use dotenv::dotenv;


pub async fn connect_db() -> PgPool {
    dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("DATABASE URL must EXIST and in the .env file");
    PgPoolOptions::new()
      .max_connections(5)
      .connect(&db_url)
      .await
      .expect("Failed to connect to database")
}
