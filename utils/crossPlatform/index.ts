import { getTauriVersion } from "@tauri-apps/api/app"
import { invoke } from "@tauri-apps/api/tauri"

export const openLinkOnNewTab = async (url: string) => {
  const tauriVersion = await getTauriVersion()
  console.log("tauriVersion", tauriVersion)
  if (tauriVersion) {
    invoke("open_link", { url })
  } else {
    window.open(url, "_blank")
  }
}
