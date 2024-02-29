use axum::{routing::post, Json, Router};
use backend::{jwt::{AuthBody, AuthError, Claims}, login};
use chrono::{Duration, Local};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/v1/login", post(login_handler))
        .route("/v1/me", post(me_handler))
        .layer(CorsLayer::permissive());

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn login_handler(Json(payload): Json<LoginPayload>) -> Result<Json<AuthBody>, AuthError> {
    if payload.password.is_empty() {
        return Err(AuthError::MissingCredentials);
    }
    let attempt = login(&payload.password);
    if attempt.is_err() {
        return Err(AuthError::MissingCredentials);
    } else if !attempt.unwrap() {
        return Err(AuthError::WrongCredentials)
    }
    let claim = Claims {
        sub: "Will_or".to_string(),
        access: "Admin".to_string(),
        exp: (Local::now() + Duration::hours(1)).timestamp() as usize,
    };
    let key = &EncodingKey::from_secret("secret".as_ref());
    let token = match encode(&Header::default(), &claim, key) {
        Ok(token) => token,
        Err(_) => return Err(AuthError::TokenCreation), 
    };
    Ok(Json(AuthBody::new(token)))
}

async fn me_handler(claim: Claims) -> Result<String, AuthError> {
    Ok(format!("Hey there {claim}"))
}

#[derive(Debug, Serialize, Deserialize)]
struct LoginPayload {
    password: String,
}
