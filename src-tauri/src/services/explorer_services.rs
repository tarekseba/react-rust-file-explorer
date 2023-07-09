use crate::{Directory, FileType};
use std::{
    fs::{self, ReadDir},
    io::ErrorKind,
    path::PathBuf,
};
use sublime_fuzzy::FuzzySearch;

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

pub fn readdir_rec(query: &str, start_path: &str) -> std::io::Result<Vec<Directory>> {
    let mut all_entries: Vec<Directory> = vec![];
    readdir_rec_aux(query, start_path, &mut all_entries).map(|_| all_entries)
}

fn readdir_rec_aux(
    query: &str,
    start_path: &str,
    all_entries: &mut Vec<Directory>,
) -> std::io::Result<()> {
    let dir: ReadDir = fs::read_dir(start_path)?;
    dir.flatten().try_for_each(|d| {
        let is_dir: bool = d.file_type()?.is_dir();
        let score = FuzzySearch::new(query, &d.file_name().to_string_lossy().to_string())
            .case_insensitive()
            .best_match();
        if let Some(score) = score {
            if score.score() > 80 {
                all_entries.push(Directory {
                    file_type: FileType::from(&d.path()),
                    name: d.path().file_name().unwrap().to_string_lossy().to_string(),
                    path: d.path().to_string_lossy().to_string(),
                    error: None,
                })
            }
        }
        if is_dir {
            match readdir_rec_aux(query, &d.path().to_string_lossy().to_string(), all_entries) {
                Err(err) => match err.kind() {
                    ErrorKind::PermissionDenied => (),
                    _ => return Err(err),
                },
                _ => (),
            }
        }
        Ok(())
    })
}
