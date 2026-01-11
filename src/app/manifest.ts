import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WhatConf App",
    short_name: "WhatConf",
    description: "Never miss a tech conference again!",
    start_url: "/",
    display: "standalone",
    background_color: "#16191d",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
