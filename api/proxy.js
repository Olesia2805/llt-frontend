import process from "node:process";

export default async function handler(req, res) {
  const { path } = req.query;

  const backendBaseUrl = process.env.VITE_PROXY_TARGET;

  const targetUrl = `${backendBaseUrl}/api/v1/${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}
