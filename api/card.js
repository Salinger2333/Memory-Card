/* eslint-env node */
export default async function handler(req, res) {
  // 从 Vercel 环境变量获取你刚刚存的 Token
  const token = process.env.CLASH_ROYALE_API_KEY;

  try {
    // 这里的 URL 可以根据前端传来的参数动态拼接，或者写死测试
    const response = await fetch("https://api.clashroyale.com/v1/cards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
