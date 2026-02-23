import { Poppins, Inter, Pixelify_Sans, Cormorant_Garamond, Bodoni_Moda, Pacifico, Rozha_One, Yatra_One, Noto_Sans_Devanagari, Playfair_Display, Geist } from "next/font/google";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
})
export const pixelifySans = Pixelify_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-pixelify-sans",
    display: "swap",
})

export const bodoniModa = Bodoni_Moda({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-bodoni-moda",
    display: "swap",
})

export const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-pacifico",
    display: "swap",
})

export const rozhaOne = Rozha_One({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-rozha-one",
    display: "swap",
})
export const yatraOne = Yatra_One({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-yatra-one",
    display: "swap",
})

export const notoSansDevanagari = Noto_Sans_Devanagari({
    subsets: ["latin", "devanagari"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-noto-sans-devanagari",
    display: "swap",
})

export const playfair_Display = Playfair_Display({
    subsets: ["latin",],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair-display",
    display: "swap",

})

export const cormorant_garamond = Cormorant_Garamond({
    subsets: ["latin",],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",

})

export const inter = Inter({
    subsets: ["latin",],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
    display: "swap",

})

export const geist = Geist({
    subsets: ["latin",],
    weight: ["400", "500", "600", "700"],
    variable: "--font-geist",
    display: "swap",
})
