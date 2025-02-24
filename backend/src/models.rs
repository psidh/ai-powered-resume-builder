use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Resume {
    pub id: Uuid,
    pub user_id: Uuid,
    pub name: String,
    pub experience: String,
    pub skills: Vec<String>,
}

