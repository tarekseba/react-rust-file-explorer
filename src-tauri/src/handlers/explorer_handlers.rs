use crate::{
    domain::dtos::Payload,
    services::explorer_services::{readdir, readlink},
    Directory,
};

#[tauri::command]
pub async fn readlink_handler(path: String) -> Payload<Directory> {
    Payload::from(readlink(&path))
}

#[tauri::command]
pub async fn readdir_handler(path: String) -> Payload<Vec<Directory>> {
    Payload::from(readdir(&path))
}
