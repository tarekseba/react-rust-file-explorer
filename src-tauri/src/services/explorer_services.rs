use crate::{Directory, FileType};
use std::{fs::{self, ReadDir}, path::PathBuf, io::ErrorKind};

pub fn readdir(path: &str) -> std::io::Result<Vec<Directory>> {
    let dir = fs::read_dir(path)?;
    let mut all_entries: Vec<Directory> = vec![];
    for d in dir {
        match d {
            Ok(dir) => {
                all_entries.push(Directory::from(&dir.path()));
            }
            Err(_) => (),
        }
    }
    Ok(all_entries)
}

pub fn readlink(path: &str) -> Result<Directory, std::io::Error> {
    let path = PathBuf::from(path);
    let entry_path = fs::read_link(path)?;
    Ok(Directory {
        file_type: FileType::from(&entry_path),
        name: entry_path
            .file_name()
            .unwrap()
            .to_string_lossy()
            .to_string(),
        path: entry_path.to_string_lossy().to_string().to_owned(),
        error: None,
    })
}

pub fn readdir_rec(path: &str, all_files: &mut Vec<Directory>) -> std::io::Result<()> {
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

