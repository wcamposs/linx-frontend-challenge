const express = require("express");
const path = require("path");

const app = express();

/* Ensure any requests prefixed with /static will serve our "app/src" directory */
app.use("/src", express.static(path.resolve(__dirname, "app", "src")));

/* Redirect all routes to our (soon to exist) "index.html" file */
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("app", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running on  http://localhost:3000..."));
