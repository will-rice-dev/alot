use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use backend::login;
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/v1/login", get(login_handler));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn login_handler(Json(payload): Json<LoginPayload>) -> impl IntoResponse {
    if payload.password.is_empty() {
        return StatusCode::BAD_REQUEST.into_response();
    }
    let attempt = login(&payload.password);
    if attempt.is_err() {
        return StatusCode::BAD_REQUEST.into_response();
    } else if !attempt.unwrap() {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    StatusCode::OK.into_response()
}

#[derive(Debug, Serialize, Deserialize)]
struct LoginPayload {
    password: String,
}
