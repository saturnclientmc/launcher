use std::env;
use std::path;

#[cfg(target_family = "unix")]
pub fn get_data_folder() -> Result<path::PathBuf, env::VarError> {
    let home = env::var("HOME")?;
    Ok(path::PathBuf::from(home).join(".saturn-launcher"))
}

#[cfg(target_family = "windows")]
pub fn get_data_folder() -> Result<path::PathBuf, env::VarError> {
    let env = env::var("APPDATA")?;
    Ok(path::PathBuf::from(env).join(".saturn-launcher"))
}
