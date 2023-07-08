// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    ffi::OsStr,
    fs::{self, ReadDir},
    io::ErrorKind,
    path::PathBuf,
    time::Instant,
};

use serde::Serialize;

#[derive(Default, Serialize)]
struct NotTest {
    name: String,
    age: u8,
}

#[tauri::command]
async fn readdir_handler(path: String) -> Vec<Directory> {
    let now = Instant::now();
    let mut all_entries: Vec<Directory> = vec![];
    let _ = readdir(&path, &mut all_entries);
    println!("after {:?}", now.elapsed());
    all_entries
}

#[tauri::command]
async fn readlink_handler(path: String) -> Option<Directory> {
    let path = PathBuf::from(path);
    if let Ok(path_buf) = fs::read_link(path) {
        return Some(Directory {
            file_type: FileType::from(&path_buf),
            name: path_buf.file_name().unwrap().to_string_lossy().to_string(),
            path: path_buf.to_string_lossy().to_string().to_owned(),
            error: None,
        });
    }
    None
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![readdir_handler, readlink_handler])
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
struct Directory {
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
        println!("{:?}", dir);
        dir
    }
}

impl From<&PathBuf> for FileType {
    fn from(value: &PathBuf) -> Self {
        println!(
            "file: {:?} | is symlink : {} | is file : {}, is dir : {}",
            value.file_name(),
            value.is_symlink(),
            value.is_file(),
            value.is_dir()
        );
        println!("{:?}", fs::metadata(value));
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

fn readdir_rec(path: &str, all_files: &mut Vec<Directory>) -> std::io::Result<()> {
    let dir: ReadDir = fs::read_dir(path)?;
    dir.flatten().try_for_each(|d| {
        let is_dir: bool = d.file_type()?.is_dir();
        if is_dir {
            match readdir_rec(&d.path().to_string_lossy().to_string(), all_files) {
                Ok(_) => (),
                Err(err) => match err.kind() {
                    ErrorKind::PermissionDenied => all_files.push(Directory {
                        file_type: FileType::Directory,
                        name: d.path().file_name().unwrap().to_string_lossy().to_string(),
                        path: d.path().to_string_lossy().to_string(),
                        error: Some(err.to_string()),
                    }),
                    _ => return Err(err),
                },
            }
        } else {
            all_files.push(Directory {
                file_type: FileType::from(&d.path()),
                name: d.path().file_name().unwrap().to_string_lossy().to_string(),
                path: d.path().to_string_lossy().to_string(),
                error: None,
            });
            if &d.path().file_name().unwrap().to_string_lossy() == ".zshrc" {}
        }
        Ok(())
    })
}

fn readdir(path: &str, all_entries: &mut Vec<Directory>) -> std::io::Result<()> {
    let dir = fs::read_dir(path)?;
    for d in dir {
        match d {
            Ok(dir) => {
                all_entries.push(Directory::from(&dir.path()));
            }
            Err(_) => (),
        }
    }
    Ok(())
}
