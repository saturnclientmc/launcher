/*
Resources:
    - https://tauri.app/develop/calling-rust/
*/

const FABRIC_API: &str =
    "https://cdn.modrinth.com/data/P7dR8mSH/versions/p96k10UR/fabric-api-0.119.4%2B1.21.4.jar";
const LATEST_CLIENT: &str = "https://github.com/saturnclientmc/saturnclient/releases/download/0.0.4-beta2/saturnclient-0.0.4-beta2.jar";
const CLIENT_JAR: &str = "saturnclient-0.0.4-beta2.jar";

use std::fs;

pub mod env;

#[tauri::command]
fn authenticate() {
    let base_path = env::get_data_folder().expect("error get folder game");
    let auth_path = base_path.join("auth");

    match saturn_launcher::auth::auth_microsoft() {
        Ok(auth) => match saturn_launcher::auth::save(&auth_path, &auth) {
            Ok(_) => println!("Authentication successful."),
            Err(e) => println!("Failed to save authentication: {:?}", e),
        },
        Err(e) => println!("Authentication failed: {:?}", e),
    }
}

#[tauri::command]
fn download(version: &str) {
    println!("Downloading {version}");
    saturn_launcher::download_version("1.21.4");
    println!("Downloaded {version}");
    println!("Installing fabric for {version}");
    saturn_launcher::install_fabric(version, "0.17.2");
    println!("Fabric installed for {version}");

    println!("Installing Saturn Client for {version}");
    let base_path = env::get_data_folder().unwrap();
    let mods_path = base_path.join("instances").join(version).join("mods");
    if !mods_path.exists() {
        fs::create_dir_all(&mods_path).unwrap();
    }
    let saturn_jar = mods_path.join(CLIENT_JAR);
    {
        let mut saturn_file = fs::File::create(saturn_jar).unwrap();
        saturn_launcher::download::download(LATEST_CLIENT, &mut saturn_file).unwrap();
        println!("Saturn Client Installed for {version}");
    }

    let fabric_api_jar = mods_path.join("fabric-api.jar");
    {
        let mut fabric_file = fs::File::create(fabric_api_jar).unwrap();
        saturn_launcher::download::download(FABRIC_API, &mut fabric_file).unwrap();
        println!("Saturn Client Installed for {version}");
    }
}

#[tauri::command]
fn check_version(version: &str) {
    let base_path = env::get_data_folder().unwrap();
    let instances_path = base_path.join("instances");
    let instance = instances_path.join(version);

    if saturn_launcher::launch::check_version_integrity(&instance, &format!("{version}-fabric")) {
        println!("Version {version} is ok");
    } else {
        println!("Version {version} is not ok");
    }
}

#[tauri::command]
fn launch_minecraft(username: &str, version: &str) {
    let base_path = env::get_data_folder().unwrap();
    let auth_path = base_path.join("auth");
    let jre_path = base_path.join("jre");
    let instances_path = base_path.join("instances");
    let instance = instances_path.join(version);

    let auth = match saturn_launcher::auth::load(&auth_path, &username) {
        Ok(Some(auth)) => auth,
        Ok(None) => saturn_launcher::auth::auth_offline("offline_player"),
        Err(e) => {
            println!("Failed to load authentication: {:?}", e);
            return;
        }
    };

    if !instance.exists() {
        download(version);
    }

    saturn_launcher::launch::launch_minecraft_version(
        &instance,
        &jre_path,
        &format!("{version}-fabric"),
        &auth,
    )
    .unwrap()
}

#[tauri::command]
fn list_accounts() -> Vec<String> {
    let base_path = env::get_data_folder().expect("error get folder game");
    let auth_path = base_path.join("auth");

    if !auth_path.exists() {
        fs::create_dir_all(&auth_path).unwrap();
    }

    match std::fs::read_dir(auth_path) {
        Ok(dir) => dir
            .filter_map(|entry| {
                entry.ok().and_then(|e| {
                    let path = e.path();
                    if path.is_file() {
                        if let Some(f) = e.file_name().into_string().ok() {
                            Some(f.trim_end_matches(".json").to_string())
                        } else {
                            None
                        }
                    } else {
                        None
                    }
                })
            })
            .collect(),
        Err(e) => {
            println!("Error listing accounts: {:?}", e);
            Vec::new()
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            authenticate,
            download,
            check_version,
            launch_minecraft,
            list_accounts,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
