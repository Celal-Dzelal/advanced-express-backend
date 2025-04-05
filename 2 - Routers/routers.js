const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//* To try out your codes, first open a terminal in the folder you are working in and type "nodemon routers.js".

//* Secondly, install the Thunder Client plugin in VSCode and after making a new request, enter your own URL address in the relevant field.

//* Another thing you need to do is to activate the server at the beginning, even though it is in the last line. Don't forget to do "app.listen" for this.

/*//! ---------------------------- express.Router() ---------------------------- */

//* If you are going to activate these lines, comment lines 39 and 40. Otherwise, you will get an error.
// const router = express.Router();
// app.use(router); //* If you not write, router not works.

// router.get("/", (req, res) => res.send({ method: "GET" }));
// router.post("/", (req, res) => res.send({ method: "POST" }));
// router.delete("/", (req, res) => res.send({ method: "DELETE" }));

//* Don't forget to comment out the codes above to avoid conflicts with the codes to be written later.

//? Chain Routes = More readable.

// router
//   .route("/")
//   .get((req, res) => res.send({ type: "Chain Route", method: "GET" }))
//   .post((req, res) => res.send({ type: "Chain Route", method: "POST" }))
//   .delete((req, res) => res.send({ type: "Chain Route", method: "DELETE" }));

//* Don't forget to comment out the codes above to avoid conflicts with the codes to be written later.

/*//! ------------------------ Routes in a Separate File ----------------------- */

//* Go to the index.js file inside the routes folder.

//? Importing the Router from ./routes/index.js

const router = require("./routes");
app.use(router);
//* To avoid errors, go back to lines 14 and 15 and comment them out.

/*//! -------------------------------------------------------------------------- */

app.listen(PORT, () => console.log(`Running at:http://127.0.0.1:${PORT}`));
