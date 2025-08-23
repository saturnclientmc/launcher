import { invoke } from "@tauri-apps/api/core";

export const authenticate = () => invoke('authenticate');
export const download = (version: string) => invoke('download', { version });
export const checkVersion = (version: string) => invoke('check_version', { version });
export const launchMinecraft = (username: string, version: string) => invoke('launch_minecraft', { username, version });