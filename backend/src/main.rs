mod auth;
mod db;
mod gemini_service;
mod models;
mod routes;

use crate::gemini_service::GeminiService;
use crate::routes::create_router;
use axum::serve;
use dotenv::dotenv;
use sqlx::PgPool;
use std::env;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::sync::Mutex;
use tracing::{error, info};
use tracing_subscriber;

#[tokio::main]
async fn main() {
    // Enable logging
    tracing_subscriber::fmt()
        .with_env_filter("debug") 
        .init();

    // Load .env file
    dotenv().ok();

    // Fetch DATABASE_URL at runtime
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let db = PgPool::connect(&database_url).await.unwrap();
    let app_state = Arc::new(Mutex::new(Vec::new()));
    let gemini_service = Arc::new(GeminiService::new());
    let app = create_router(db, app_state, (gemini_service).clone());
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await.unwrap();

    info!("🚀 Server running at http://{}", addr);

    serve(listener, app).await.unwrap();
}
