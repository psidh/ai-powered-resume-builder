mod db;
mod auth;
mod models;
mod routes;

use axum::serve;
use tokio::net::TcpListener;
use std::net::SocketAddr;
use crate::routes::create_router;

#[tokio::main]
async fn main() {
    let app = create_router();
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await.unwrap();

    println!("🚀 Server running at http://{}", addr);

    serve(listener, app)
        .await
        .unwrap();
}
