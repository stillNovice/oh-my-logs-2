const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/v1/getDirectoryData', (req, res) => {
  let directoryUrl = req.query.url;
  let dirContentsArr = [];
  fs.readdir(directoryUrl, (err, dirContents) => {
    if (err) {
      console.error(err);
      return;
    }

    for (let i = 0; i < dirContents.length; i ++) {
      let stats = fs.statSync(directoryUrl + '/' + dirContents[i]);
      let typeF = (stats.isFile()) ? 'file' : 'dir';
      dirContentsArr.push({
          name: dirContents[i],
          type: typeF
      });
    }

    res.json(dirContentsArr);
  });
});

app.get('/v1/getFileData', (req, res) => {
  let fileUrl = req.query.url;

  fs.readFile(fileUrl, (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }

    res.send(fileContents.toString());
  });
});

app.listen(1080);