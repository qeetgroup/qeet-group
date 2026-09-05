import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qeet Group",
    short_name: "Qeet",
    description:
      "One technology organisation building a connected ecosystem of products on shared identity and design foundations.",
    start_url: "/",
    display: "standalone",
    // Both mirror --color-canvas in the DARK theme, which is the site default.
    // These were split across themes before — a light splash screen followed by
    // a dark app is a visible flash on every launch.
    background_color: "#101214",
    theme_color: "#101214",
    icons: [
      {
        src: "/qeet-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
