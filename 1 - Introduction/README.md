# 🛠️ Initial Setup

```
npm init -y                   # Create package.json (initialize project)
npm install -D nodemon        # Install nodemon as a dev dependency
npm install express dotenv    # Install express and dotenv
echo PORT=8000 > .env         # Create .env file and set PORT
```

# 🚀 Express Start

```
const express = require("express");       // Import Express
const app = express();                    // Initialize Express app
```

# 🌱 Environment Variables

```
require("dotenv").config();               // Load .env variables
const PORT = process.env?.PORT || 8000;   // Use PORT from .env or fallback to 8000
```

# ⚙️ HTTP Methods

```
app.get("/path", (req, res) => res.send("GET request"));
app.post("/path", (req, res) => res.send("POST request"));
app.put("/path", (req, res) => res.send("PUT request"));
app.patch("/path", (req, res) => res.send("PATCH request"));
app.delete("/path", (req, res) => res.send("DELETE request"));
app.all("/path", (req, res) => res.send("All Methods")); // Runs for all HTTP Methods
```

# 🧩 Chainable Route Method

```
app.route("/example")
  .get((req, res) => res.send("GET"))
  .post((req, res) => res.send("POST"))
  .put((req, res) => res.send("PUT"))
  .patch((req, res) => res.send("PATCH"))
  .delete((req, res) => res.send("DELETE"));
```

# 🛣️ ROOT Url Path

```
app.get("/", (req, res) => res.send("Root route"));  // Ana rota
```

# 🎯 Wildcards

```
app.get("/abc(x?)123", (req, res) => res.send("Optional 'x'"));
// Matches /abc123 and /abcx123

app.get("/abc(x+)123", (req, res) => res.send("One or more 'x'"));
// Matches /abcx123, /abcxx123, but NOT /abc123

app.get("/abc(*)123", (req, res) => res.send("Wildcard in the middle"));
// Matches anything between abc and 123

app.get("*", (req, res) => res.send("Catch-all route"));
// Matches everything (usually used as 404 fallback)

```

# 🔍 RegEx

```
app.get(/xyz/, (req, res) => res.send("Contains 'xyz'"));
// Matches any route that includes 'xyz'

app.get(/^\/xyz/, (req, res) => res.send("Starts with 'xyz'"));
// Matches routes that start with /xyz

app.get(/xyz$/, (req, res) => res.send("Ends with 'xyz'"));
// Matches routes that end with 'xyz'

```

# 📦 Route Parameters

```
app.get("/blogs/:blogId/:author/search", (req, res) => {
  res.send({
    // URL Parameters (/blogs/123/John/search)
    params: req.params,             // { blogId: '123', author: 'John' }
    blogId: req.params.blogId,      // '123'
    author: req.params.author,      // 'John'

    // Query Parameters (?title=Hello)
    query: req.query,               // { title: 'Hello' }
    title: req.query.title,         // 'Hello'

    // URL Details
    url: {
      protocol: req.protocol,       // 'http' or 'https'
      subdomain: req.subdomains,    // ['sub'] if request is to sub.example.com
      hostname: req.hostname,       // 'localhost' or domain name
      path: req.path,               // '/blogs/123/John/search'
      originalUrl: req.originalUrl, // '/blogs/123/John/search?title=Hello'
    },
  });
});
```

- **req.params**: These are dynamic parameters defined in the URL using :.
- **req.query**: These are query parameters in the format ?key=value.
- **req.protocol**: Indicates whether the request was made via HTTP or HTTPS.
- **req.hostname**: Returns the domain or localhost from which the request was made.
- **req.path**: Returns only the path part of the URL, excluding query parameters.
- **req.originalUrl**: Returns the full URL of the incoming request.

# 📤 Response Methods

## ✅ Send JSON and Status Code

```
app.get("/", (req, res) => {
  res.status(202).send({
    message: "Accepted but not yet processed",
    status: 202
  });
});
```

## 📁 Download

```
app.get("/download", (req, res) => {
  res.download("./docs.js", "downloaded.js");
});
```

### 🧠 Extras: Other Res Methods

- **res.send()**: String veya JSON gönderir
- **res.json()**: JSON formatında veri gönderir
- **res.status()**: HTTP durum kodu ayarlar
- **res.redirect()**: Başka bir URL'ye yönlendirir
- **res.render()**: Template engine kullanarak sayfa render eder
- **res.download()**: Dosya indirmeye zorlar
- **res.end()**: Yanıtı sonlandırır

#### Listen

```
app.listen(PORT, () => console.log(`Running at:http://127.0.0.1:${PORT}`))
```
