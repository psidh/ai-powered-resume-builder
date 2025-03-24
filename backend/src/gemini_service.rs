use crate::models::Resume;
use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::env;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct ResumeRequest {
    pub user_id: Uuid,
    pub name: String,
    pub experience: String,
    pub skills: Vec<String>,
}

#[derive(Clone)]
pub struct GeminiService {
    client: Client,
    api_url: String,
    api_key: String,
}

impl GeminiService {
    pub fn new() -> Self {
        let api_url = env::var("API_URL").expect("VALID API MUST BE ENTERED");
        let api_key = env::var("GEMINI_API_KEY").expect("API_KEY must be set in .env file");
        Self {
            client: Client::new(),
            api_url: api_url.to_string(),
            api_key: api_key.to_string(),
        }
    }
    
    pub async fn generate_resume(&self, input: ResumeRequest) -> Result<Resume> {
        let prompt = format!(
            "Generate a JSON formatted resume with this structure: \
            {{ \"id\": \"uuid\", \"user_id\": \"uuid\", \"name\": \"string\", \"experience\": \"string\", \"skills\": [\"string\"] }}. \
            Name: {}, Experience: {}, Skills: {:?}. Return only valid JSON with no additional explanation.",
            input.name, input.experience, input.skills
        );

        let request_payload = serde_json::json!({
            "contents": [{"parts": [{"text": prompt}]}]
        });

        let url = format!("{}?key={}", self.api_url, self.api_key);

        let response = self
            .client
            .post(&url)
            .header("Content-Type", "application/json")
            .json(&request_payload)
            .send()
            .await?;

        let status = response.status();
        let text = response.text().await?;

        println!("Gemini API Response: Status: {}, Body: {}", status, text);

        if !status.is_success() {
            return Err(anyhow::anyhow!(
                "Failed to generate resume: {} - {}",
                status,
                text
            ));
        }

        let parsed_response: serde_json::Value = serde_json::from_str(&text)?;

        let mut generated_text = parsed_response["candidates"][0]["content"]["parts"][0]["text"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Invalid response structure"))?
            .to_string();

        // Remove markdown code block if present
        if generated_text.starts_with("```json") {
            generated_text = generated_text
                .trim_start_matches("```json")
                .trim_end_matches("```")
                .trim()
                .to_string();
        }

        // Ensure the response contains valid JSON
        let generated_json: serde_json::Value =
            serde_json::from_str(&generated_text).map_err(|_| {
                anyhow::anyhow!("Generated response is not valid JSON: {}", generated_text)
            })?;

        let resume: Resume = serde_json::from_value(generated_json)?;

        Ok(resume)
    }
}
