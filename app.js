const axios = require("axios");
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const { getHeapStatistics } = require("v8");
const { stringify } = require("querystring");

function metalPrice(url) {
  setInterval(async () => {
    await fetch("https://lepricon.uz/web/nd-birjadata/birja-data")
      .then((res) => res.json())
      .then((res) => {
        const jsonString = JSON.stringify(res);

        fs.writeFile("./metal.json", jsonString, (err) => {
          if (err) {
            console.log("Error writing file", err);
          } else {
            console.log("Successfully wrote file");
          }
        });
      })

      .catch((err) => console.log(err));
  }, 6000);
}

metalPrice();

app.get("/metal", (req, res) => {
  res.sendFile(path.join(__dirname, "/", "metal.json"));
});

app.listen(3000);
