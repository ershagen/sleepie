import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sleepie",
    short_name: "Sleepie",
    description: "Lugnare nätter för bebis och förälder",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#6B8F71",
    lang: "sv",
    categories: ["shopping", "lifestyle"],
  };
}
