import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8000;
const app = express();


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '86400');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

/**
 * @name get/getImage
 */
app.get('/getImage/:user', (req, res) => {
  const dir = `/static/${req.params.user}`;
  console.log(dir)
  if (!fs.existsSync(`.${dir}`)) {
    fs.mkdirSync(`.${dir}`, (err) => {
      if (err) {
        res.json({"error": "not make dir"});
      }
    });
  }
  fs.readdir(`.${dir}`, function (err, files) {
    if (err) throw err;
    const fileList = []
      files.forEach((data) => { 
      if (data.match(/(jpg|png|gif)$/)) {
        fileList.push({
          name: data,
        });
      }
    })
    res.json({images:fileList});
  });
});

app.put('/upload/:user/:file', (req, res) => {

  let buffers = [];
  let cnt = 0;

  req.on('data', (chunk) => {
      buffers.push(chunk);
  });

  req.on('end', () => {
    req.rawBody = Buffer.concat(buffers);
    const fileName = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
    const fileType = req.params.file.replace(/.+(\..+?)$/, '$1');
    const filepath = `./static/${req.params.user}/${fileName + fileType}`;
    const dirname = path.dirname(filepath);
      
    fs.access(dirname, fs.constants.R_OK | fs.constants.W_OK, (dir) => {
      if (dir) {
        if (dir.code === "ENOENT") {
          fs.mkdirSync(dirname);
        } else {
          return;
        }
      }
      fs.writeFile(filepath, req.rawBody, 'utf-8',(err) => {
        if(err) return;
        res.send(`${fileName + fileType}`);
      });
    });
  });
});
app.all('*', (req, res, next) => {
  res.send(`Got a ${req.method} request at server`);
});

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
