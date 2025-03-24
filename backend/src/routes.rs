use crate::{
    auth::create_jwt,
    gemini_service::{GeminiService, ResumeRequest},
    models::{LoginUser, RegisterUser, Resume},
};
use argon2::{self, Argon2, PasswordHasher, PasswordVerifier};
use axum::{
    Extension, Json, Router,
    extract::State,
    http::StatusCode,
    routing::{get, post},
};
use sqlx::PgPool;
use std::sync::Arc;
use tokio::sync::Mutex;
type AppState = Arc<Mutex<Vec<Resume>>>;
use password_hash::{PasswordHash, SaltString, rand_core::OsRng};

// use uuid::Uuid;

pub async fn signup(
    Extension(pool): Extension<PgPool>,
    Json(user): Json<RegisterUser>,
) -> Result<Json<String>, StatusCode> {
    println!("We got the request,  {}", user.email);
    let salt = SaltString::generate(&mut OsRng);

    // Hash the password
    let hashed_password = Argon2::default()
        .hash_password(user.password.as_bytes(), &salt)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .to_string();

    println!("Generated hashed password: {}", hashed_password);

    // Insert user into the database
    let new_user = sqlx::query!(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
        user.email,
        hashed_password
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        println!("Error,  {}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    // Generate JWT token
    let token = create_jwt(&new_user.id.to_string());
    Ok(Json(token))
}

pub async fn login(
    Extension(pool): Extension<PgPool>,
    Json(user): Json<LoginUser>,
) -> Result<Json<String>, StatusCode> {
    let db_user = sqlx::query!(
        "SELECT id, password FROM users WHERE email = $1",
        user.email
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::UNAUTHORIZED)?;
    let parsed_hash =
        PasswordHash::new(&db_user.password).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    if Argon2::default()
        .verify_password(user.password.as_bytes(), &parsed_hash)
        .is_ok()
    {
        let token = create_jwt(&db_user.id.to_string());
        Ok(Json(token))
    } else {
        Err(StatusCode::UNAUTHORIZED)
    }
}

pub async fn get_resumes(State(db): State<AppState>) -> Json<Vec<Resume>> {
    let resumes = db.lock().await;
    Json(resumes.clone())
}

#[axum::debug_handler]
pub async fn generate_resume(
    Extension(service): Extension<Arc<GeminiService>>,
    Json(request): Json<ResumeRequest>,
) -> Result<Json<Resume>, StatusCode> {
    tracing::info!("Received request to generate resume: {:?}", request);
    match service.generate_resume(request).await {
        Ok(resume_response) => {
            tracing::info!("Resume generated successfully: {:?}", resume_response);
            let resume = Resume {
                id: resume_response.id,
                user_id: resume_response.user_id,
                name: resume_response.name,
                skills: resume_response.skills,
                experience: resume_response.experience,
            };
            Ok(Json(resume))
        }
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn test() -> String {
    "hi there the test was succeeded".to_string()
}

pub fn create_router(db: PgPool, app_state: AppState, gemini_service: Arc<GeminiService>) -> Router {
    Router::new()
        .route("/signup", post(signup))
        .route("/login", post(login))
        .route("/resumes", get(get_resumes))
        .route("/generate_resume", post(generate_resume))
        .route("/test", get(test))
        .layer(Extension(db))
        .layer(Extension(gemini_service))
        .with_state(app_state)
}
