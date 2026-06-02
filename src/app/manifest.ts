import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qeet Group",
    short_name: "Qeet",
    description:
      "A multi-company holding built on a single philosophy: that meaningful progress begins with the right question.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFCFC",
    theme_color: "#0A0A0A",
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
