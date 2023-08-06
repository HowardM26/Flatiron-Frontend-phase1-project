const express = require("express");
const path = require("path");

const app = express();

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("Flatiron-Frontend-phase1-project", "index.html"));
});

app.listen(process.env.PORT || 5501, () => console.log("Server running..."));
