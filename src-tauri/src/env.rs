use smallauncher_lib::path;
use std::env;
use std::path;

#[cfg(target_family = "unix")]
pub fn get_data_folder() -> Result<path::PathBuf, env::VarError> {
    let home = env::var("HOME")?;
    Ok(path!(home, ".saturn-launcher"))
}

#[cfg(target_family = "windows")]
pub fn get_data_folder() -> Result<path::PathBuf, env::VarError> {
    let env = env::var("APPDATA")?;
    Ok(path!(env, ".saturn-launcher"))
}
