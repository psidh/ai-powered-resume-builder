use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub password: String, // Stored as a hashed password
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterUser {
    pub email: String,
    pub password: String, // Plain text password from user input
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginUser {
    pub email: String,
    pub password: String, // Plain text password for login
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Resume {
    pub id: Uuid,
    pub user_id: Uuid,
    pub name: String,
    pub experience: String,
    pub skills: Vec<String>,
}

