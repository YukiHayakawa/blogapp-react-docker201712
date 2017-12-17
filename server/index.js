import express from 'express';
import mysql from 'mysql';
import mysqltorest from 'mysql-to-rest';

const PORT = process.env.PORT || 8080;
const app = express();
const connection = mysql.createConnection({
  host     : 'db',
  user     : 'example_user',
  password : 'example_pass',
  database: 'example',
  port: '3306',
  timezone : 'Asia/Tokyo'
});


connection.connect();


// 同一セグメントからのみの接続を許可
app.set('trust proxy', 'loopback'); 
// app.set('trust proxy', 'loopback,192.168.0.1'); // 同一セグメントプラス特定IPのみ許可

app.all('*', function (req, res, next) {
  console.log(req.originalUrl,'*');
  next();
});

const api = mysqltorest(app, connection);
app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
