var express = require('express');
var app = express();
const cors = require('cors');
const { parseRequest, openFileInEditor, parsereRequestURL } = require('./action')

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:8100',
  'http://localhost:4200'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
}

app.options('*', cors(corsOptions));
app.use(cors());

app.post('/lauch', cors(corsOptions), function(req,resp){
  parseRequest(req)
  .then(data => {
    return openFileInEditor(data.para, data.application)
  }).then(msg => {
    resp.send(`201：${msg}`)
  }).catch(errmsg => {
    resp.send(`服务失败：${errmsg}`);
  })
})

app.get('/lauch', cors(corsOptions), function(req,resp){
  parsereRequestURL(req)
  .then(d => {  
    let data = d
    if (typeof d === 'string') {
      data = JSON.parse(d)
    }
    
    return openFileInEditor(data.para, data.application)
  }).then(msg => {
    resp.send(`201：${msg}`)
  }).catch(errmsg => {
    resp.send(`服务失败：${errmsg}`);
  })
})

app.listen(3001, function () {
  console.log('华鹤本地服务 启动端口：3001!');
});