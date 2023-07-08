use std::io::ErrorKind;

use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct Payload<T: Serialize> {
    pub data: Option<T>,
    pub error: Option<CustomError>,
}

impl<T: Serialize> From<Result<T, std::io::Error>> for Payload<T> {
    fn from(value: Result<T, std::io::Error>) -> Self {
        match value {
            Ok(result) => Payload {
                data: Some(result),
                error: None,
            },
            Err(error) => Payload {
                data: None,
                error: Some(CustomError::from(error.kind())),
            },
        }
    }
}

#[derive(Serialize, Debug)]
pub struct CustomError {
    message: String,
}

impl From<ErrorKind> for CustomError {
    fn from(value: ErrorKind) -> Self {
        Self {
            message: value.to_string(),
        }
    }
}
