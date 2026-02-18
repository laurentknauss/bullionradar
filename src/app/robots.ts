import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://bullionradar.fr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
      {
        userAgent: ["Bingbot", "msnbot", "msnbot-media"],
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
      {
        userAgent: ["Yandex", "YandexBot", "YandexImages"],
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"],
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
      {
        userAgent: ["ClaudeBot", "anthropic-ai"],
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
