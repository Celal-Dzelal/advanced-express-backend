const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//* To try out your codes, first open a terminal in the folder you are working in and type nodemon.

//* Secondly, install the Thunder Client plugin in VSCode and after making a new request, enter your own URL address in the relevant field.

//* Another thing you need to do is to activate the server at the beginning, even though it is in the last line. Don't forget to do "app.listen" for this.

/*//! -------------------------------- ROOT Path ------------------------------- */

app.get("/", (req, res) => res.send("ROOT Route"));

/*//! ------------------------------ HTTP Methods ------------------------------ */

// app.get("/", (req, res) => res.send({ method: "GET Request" }));
// app.post("/", (req, res) => res.send("Post Request"));
// app.put("/", (req, res) => res.send({ method: "PUT Request" }));
// app.patch("/", (req, res) => res.send("PATCH Request"));
// app.delete("/", (req, res) => res.send({ method: "DELETE Request" }));
app.all("/", (req, res) => res.send("Runs For All HTTP Methods")); //* Before try this line, you need to comment out the previously written codes.

//? Chainable Route Method

app
  .route("/chainable")
  .get((req, res) => res.send("GET Method"))
  .post((req, res) => res.send({ method: "POST Method" }))
  .put((req, res) => res.send("PUT Method"))
  .patch((req, res) => res.send({ method: "PATCH Method" }))
  .delete((req, res) => res.send("DELETE Method"));

/*//! -------------------------------- WildCards ------------------------------- */

//* If you are using new versions of Express (such as Express 4.18+ and Express 5 beta), the codes you write below will give an error.

// app.get("/abc(x?)123", (req, res) => res.send("Optional 'x'"));

// app.get("/abc(x+)123", (req, res) => res.send("One or more 'x'"));

// app.get("/abc(*)123", (req, res) => res.send("Wildcard in the middle"));

// app.get("*", (req, res) => res.send("Catch-all route"));

//* For new version of Express, use the codes below. However, even if these codes are an exact match, the URL must be encoded.

// app.get("/abc\\(x\\?\\)123", (req, res) => res.send("Optional 'x'"));

// app.get("/abc\\(x\\+\\)123", (req, res) => res.send("One or more 'x'"));

// app.get("/abc\\(\\*\\)123", (req, res) => res.send("Wildcard in the middle"));

// app.get("*", (req, res) => res.send("Catch-all route")); //* There is no escape char version

//* If you are using newer versions of Express you will need to use regex for URL wildcards, otherwise the URL will need to be encoded.

app.get(/^\/abc(x?)123$/, (req, res) => res.send("Optional x"));

app.get(/^\/abc(x+)123$/, (req, res) => res.send("One or more 'x'"));

app.get(/^\/abc(.*)123$/, (req, res) => res.send("Wildcard in the middle"));

// app.get(/.*/, (req, res) => res.send("Catch-all route")); //* We comment out this line because it may conflict with the URLs we will write later.

/*//! ---------------------------------- RegEx --------------------------------- */

// app.get(/xyz/, (req, res) => res.send("Contains 'xyz'")); //* We comment out this line because it may conflict with the URLs we will write later.

app.get(/^\/xyz/, (req, res) => res.send("Starts with 'xyz'"));

app.get(/xyz$/, (req, res) => res.send("Ends with 'xyz'"));

/*//! ---------------------------- Route Parameters ---------------------------- */

app.get("/blogs/:blogId/:author/search", (req, res) => {
  res.send({
    //* http://127.0.0.1:8000/blogs/123/John/search You can paste this link into ThunderClient
    params: req.params,
    blogId: req.params.blogId,
    author: req.params.author,
    query: req.query,
    title: req.query.title,
    url: {
      protocol: req.protocol,
      subdomain: req.subdomains,
      hostname: req.hostname,
      path: req.path,
      originalUrl: req.originalUrl,
    },
  });
});

/*//! ---------------------------- Response Methods ---------------------------- */

//? Send JSON and Status Code

app.get("/json", (req, res) => {
  res
    .status(202)
    .send({ message: "Accepted but not yet processed", status: 202 });
});

//? Download

app.get("/download", (req, res) => {
  res.download("./README.md", "downloaded.md");
});

/*//! -------------------------------------------------------------------------- */

app.listen(PORT, () => console.log(`Running at:http://127.0.0.1:${PORT}`));
