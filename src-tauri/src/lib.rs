/*
Resources:
    - https://tauri.app/develop/calling-rust/
*/

use smallauncher_lib::path;

pub mod env;

#[tauri::command]
fn authenticate() {
    let base_path = env::get_data_folder().expect("error get folder game");
    let auth_path = path!(&base_path, "auth");

    match smallauncher_lib::auth::auth_microsoft() {
        Ok(auth) => match smallauncher_lib::auth::save(&auth_path, &auth) {
            Ok(_) => println!("Authentication successful."),
            Err(e) => println!("Failed to save authentication: {:?}", e),
        },
        Err(e) => println!("Authentication failed: {:?}", e),
    }
}

#[tauri::command]
fn download(version: &str) {
    let base_path = env::get_data_folder().expect("error get folder game");
    let game_path = path!(&base_path, "minecraft");
    let jre_path = path!(&base_path, "jre");

    match smallauncher_lib::download::download_minecraft_version(&game_path, &jre_path, &version) {
        Ok(_) => println!("Download completed!"),
        Err(e) => println!("Download failed: {:?}", e),
    }
}

#[tauri::command]
fn check_version(version: &str) {
    let base_path = env::get_data_folder().expect("error get folder game");
    let game_path = path!(&base_path, "minecraft");

    if smallauncher_lib::launch::check_version_integrity(&game_path, &version) {
        println!("Version {version} is ok");
    } else {
        println!("Version {version} is not ok");
    }
}

#[tauri::command]
fn launch_minecraft(username: &str, version: &str) {
    let base_path = env::get_data_folder().expect("error get folder game");
    let auth_path = path!(&base_path, "auth");
    let game_path = path!(&base_path, "minecraft");
    let jre_path = path!(&base_path, "jre");

    let auth = match smallauncher_lib::auth::load(&auth_path, &username) {
        Ok(Some(auth)) => auth,
        Ok(None) => smallauncher_lib::auth::auth_offline("test_idk"),
        Err(e) => {
            println!("Failed to load authentication: {:?}", e);
            return;
        }
    };

    match smallauncher_lib::launch::launch_minecraft_version(&game_path, &jre_path, &version, &auth)
    {
        Ok(_) => println!("Game launched successfully."),
        Err(e) => println!("Failed to launch game: {:?}", e),
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
            launch_minecraft
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
