// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{ffi::OsStr, fs, path::PathBuf};

use serde::Serialize;

use crate::handlers::explorer_handlers::{readdir_handler, readdir_rec_handler, readlink_handler};

mod domain;
mod handlers;
mod services;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            readdir_handler,
            readlink_handler,
            readdir_rec_handler
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "target")]
enum FileType {
    Directory,
    File,
    Symlink(Option<String>),
    Unknown,
}

#[derive(Debug, Serialize)]
pub struct Directory {
    file_type: FileType,
    name: String,
    path: String,
    error: Option<String>,
}

impl From<&PathBuf> for Directory {
    fn from(value: &PathBuf) -> Self {
        let name = value
            .file_name()
            .unwrap_or(OsStr::new("Unnamed"))
            .to_string_lossy()
            .to_string();
        let path = value.to_string_lossy().to_string();
        let dir = Directory {
            file_type: FileType::from(value),
            name,
            path,
            error: None,
        };
        // println!("{:?}", dir);
        dir
    }
}

impl From<&PathBuf> for FileType {
    fn from(value: &PathBuf) -> Self {
        // println!(
        //     "file: {:?} | is symlink : {} | is file : {}, is dir : {}",
        //     value.file_name(),
        //     value.is_symlink(),
        //     value.is_file(),
        //     value.is_dir()
        // );
        // println!("{:?}", fs::metadata(value));
        if value.is_symlink() {
            let file_name = value.file_name();
            if let Some(f_name) = file_name {
                match fs::read_link(f_name) {
                    Ok(v) => FileType::Symlink(Some(v.to_string_lossy().to_string())),
                    Err(_) => FileType::Symlink(None),
                }
            } else {
                FileType::Symlink(None)
            }
        } else if value.is_dir() {
            FileType::Directory
        } else if value.is_file() {
            FileType::File
        } else {
            FileType::Unknown
        }
    }
}
