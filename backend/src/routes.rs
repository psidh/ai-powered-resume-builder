use axum::{Router, Json, extract::{ State}, routing::{get, post}, http::StatusCode};
use std::sync::Arc;
use tokio::sync::Mutex;
use crate::{models::{User, Resume}, auth::create_jwt};
type AppState = Arc<Mutex<Vec<Resume>>>;

pub async fn register(Json(user): Json<User>) -> Json<String> {
  let token  = create_jwt(&user.id.to_string());
  Json(token)
}

pub async fn create_resume(State(db) : State<AppState>,  Json(resume) : Json<Resume>) -> (StatusCode, Json<&'static str>){
  let mut resumes = db.lock().await;
  resumes.push(resume);
  (StatusCode::CREATED, Json("Resume added successfully!"))
}

pub async fn get_resumses(State(db) : State<AppState>) -> Json<Vec<Resume>> {
  let resumes = db.lock().await;
  Json(resumes.clone())
}

pub async fn test() -> String {
  let test_string = "hi there the test was succeded";
  test_string.to_string()
}

pub fn create_router() -> Router {
  let db: AppState = Arc::new(Mutex::new(vec![]));

  Router::new()
    .route("/register", post(register))
    .route("/resumes", get(get_resumses).post(create_resume))
    .route("/test", get(test))
    .with_state(db)
}

