const express = require('express');
const app = express();
const port = 3000;
const config = require("./lib/config")

config(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})