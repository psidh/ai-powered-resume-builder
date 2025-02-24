use axum::{Router, Json, extract::{Path, State}, routing::{get, post}, http::StatusCode};
use std::sync::Arc;
use tokio::sync::Mutex;
use crate::{models::{User, Resume}, db::connect_db, auth::{create_jwt, verify_jwt}};
use uuid::Uuid;

type AppState = Arc<Mutex<Vec<Resume>>>;

pub async fn register(Json(user): Json<User>) -> Json<String> {
  let token  = create_jwt(&user.id.to_string());
  Json(token)
}

pub async fn create_resume(State(db) : State<AppState>,  Json(Resume) : Json<Resume>) -> (StatusCode, Json<&'static str){
  let mut resumes = db.lock().await;
  resumes.push(resume);
  (StatusCode::CREATED, Json("Resume added successfully!"))
}

pub asyc
