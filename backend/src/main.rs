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
    tracing_subscriber::fmt().with_env_filter("debug").init();

    info!("🟢 Starting the AI-Powered Resume Builder backend...");

    // Load environment variables
    dotenv().ok();
    info!("✅ Loaded environment variables from .env");

    // Fetch DATABASE_URL at runtime
    let database_url = match env::var("DATABASE_URL") {
        Ok(url) => {
            info!("✅ DATABASE_URL loaded successfully");
            url
        }
        Err(_) => {
            error!("❌ DATABASE_URL is not set. Exiting...");
            std::process::exit(1);
        }
    };

    // Establish database connection
    let db = match PgPool::connect(&database_url).await {
        Ok(pool) => {
            info!("✅ Connected to the PostgreSQL database");
            pool
        }
        Err(err) => {
            error!("❌ Failed to connect to the database: {:?}", err);
            std::process::exit(1);
        }
    };

    let app_state = Arc::new(Mutex::new(Vec::new()));
    let gemini_service = Arc::new(GeminiService::new());

    info!("✅ Initialized Gemini AI Service");

    let app = create_router(db, app_state, gemini_service.clone());

    // Use dynamic port for deployment, fallback to 3000 locally
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let addr = match format!("0.0.0.0:{}", port).parse::<SocketAddr>() {
        Ok(addr) => {
            info!("✅ Server will bind to: {}", addr);
            addr
        }
        Err(err) => {
            error!("❌ Invalid address format: {:?}", err);
            std::process::exit(1);
        }
    };

    // Start listening for incoming connections
    let listener = match TcpListener::bind(addr).await {
        Ok(listener) => {
            info!("🚀 Server is running at http://{}", addr);
            listener
        }
        Err(err) => {
            error!("❌ Failed to bind server to {}: {:?}", addr, err);
            std::process::exit(1);
        }
    };

    // Run the server
    if let Err(err) = serve(listener, app).await {
        error!("❌ Server error: {:?}", err);
    }
}
