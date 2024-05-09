import { invoke } from "@tauri-apps/api/tauri"

export const IS_IN_APP_CLIENT = process.env.ILLA_USE_IN_CLIENT === "1"

export const openLinkOnNewTab = async (url: string) => {
  if (IS_IN_APP_CLIENT) {
    invoke("open_link", { url })
  } else {
    window.open(url, "_blank")
  }
}
