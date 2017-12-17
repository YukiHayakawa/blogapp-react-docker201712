import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import fetch from 'isomorphic-fetch'
import next from 'next';
import FormData from 'form-data';
import crypto from 'crypto';
import moment from 'moment';

const port = 3030
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const secret = 'iedDF83r6dgBja2Zde';
app.prepare()
.then(() => {
  const server = express()
  server.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    name : 'blogapp',
    cookie: {
      maxAge: 30 * 60 * 1000
    }
  }));

  server.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use(bodyParser.json());

  server.get('/blog/:id/', (req, res) => {
    return app.render(req, res, '/blog/', req.query)
  })

  server.get('/admin/:id/', (req, res, next) => {
    if (req.session.user) {
      return app.render(req, res, '/admin/', req.query)
    } else {
      return app.render404(req, res);
    }
  })

  server.get('/admin/', (req, res, next) => {
    if (req.session.user) {
      return app.render(req, res, '/admin/', req.query)
    } else {
      return app.render404(req, res);
    }
  })


  server.post('/api/login/', (req, res) => {
    const sha256 = crypto.createHash('sha256');
    sha256.update(secret + req.body.pass);
    const hash = sha256.digest('hex')
    fetch(`http://server:8080/api/users?email=${req.body.email}&pass=${hash}&state=public&_fields=id,name`)
    .then((response) => {
      if (response.status >= 400) {
        res.json({result:'error'})
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((json) => {
      if (json.length > 0 ) {
        req.session.user = json.json[0];
        req.session.save();
        res.json(json)
      } else {
        res.json({result:'error'})
      }
    })
  })

  server.post('/api/logout/', (req, res) => {
    delete req.session.user
    res.json({ result: 'success' })
  })

  server.post('/api/regist/', (req, res) => {
    const sha256 = crypto.createHash('sha256');
    sha256.update(secret + req.body.pass);
    const hash = sha256.digest('hex')

    const obj = Object.assign(req.body, {
      'pass': hash,
      'state': 'public',
      'created': moment().format('YYYY-MM-DD hh:mm:ss'),
      'modified': moment().format('YYYY-MM-DD hh:mm:ss')
    });
    const method = 'POST';
    const body = new FormData();
    Object.keys(obj).forEach((key) => {
      body.append(key, obj[key]);
    });

    const headers = {
      'Accept': 'application/json'
    };
    fetch(`http://server:8080/api/users`,{method, headers, body})
      .then((response) => {
      if (response.status >= 400) {
        res.json({result:'error'})
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((json) => {
      res.json(json)
    });
  })


  server.get('*', (req, res) => {
    // const user = req.session.user ? req.session.user : false;
    // console.log(req.session)
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
