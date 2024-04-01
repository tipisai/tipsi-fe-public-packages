import { isCloudVersion } from "./typeHelper"

// process.env.ILLA_APP_ENV &&
//     process.env.ILLA_APP_ENV === "production" &&
//     isCloudVersion
// initGTMConfig
export const initGTMConfig = () => {
  if (true) {
    const gaScript = document.createElement("script")
    const gaNoScript = document.createElement("noscript")
    gaScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MG2HXK5M');`

    gaNoScript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MG2HXK5M"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `

    document.body.append(gaScript, gaNoScript)
  }
}
