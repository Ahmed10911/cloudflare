export default {
  async fetch(request) {
    const url = new URL(request.url);

    // API route
    if (url.pathname === "/api/message") {
      return new Response(
        JSON.stringify({ message: "Hello from Cloudflare Worker 🚀" }),
        {
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Default: serve index.html
    return new Response(indexHTML(), {
      headers: { "Content-Type": "text/html" }
    });
  }
};

function indexHTML() {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>My Worker App</title>
</head>
<body>
  <h1>Cloudflare Worker Demo</h1>

  <button onclick="getMessage()">Get Message</button>

  <p id="output"></p>

  <script>
    async function getMessage() {
      const res = await fetch("/api/message");
      const data = await res.json();
      document.getElementById("output").innerText = data.message;
    }
  </script>
</body>
</html>
`;
}
