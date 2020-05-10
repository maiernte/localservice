const getRawBody = require('raw-body');
var cp = require("child_process");
const open = require('open');

const ROOT_Docsify = '/Users/mai/projects/tianyawiki/docs/'

function atobUTF8(b64Encoded) {
  return Buffer.from(b64Encoded, 'base64').toString('utf8');
}

function parseRequest(resq) {
  return new Promise((resolve, reject) => {
    console.log('parse', resq)
    getRawBody(resq, function(err, body){
      if(err) {
        console.log('parse failed', err)
        return reject(err)
      } else {
        console.log('param is', body.toString())
        let data = JSON.parse(body.toString())
        return resolve(data)
      }
    })
  })
}

function parsereRequestURL(resq) {
  return new Promise((resolve, reject) => {
    try {
      let queries = resq.query || resq.queries
      let txt = atobUTF8(queries.params)
      let body = JSON.parse(decodeURI(txt))
      body.para = ROOT_Docsify + body.para
      return resolve(body)
    }catch(err){
      return reject(err)
    }
  })
}

async function openFileInEditor(fileUrl, application) {
  return new Promise((resolve, reject) => {
    open(fileUrl, {app: application})
    .then(() => {
      let msg = `将使用 ${application} 打开文件 ${fileUrl} 。`
      return resolve(msg)
    }).catch(err1 => {
      console.log('err 1', err1)
      return reject(err1)
    })
  })
}

exports.parseRequest = parseRequest;
exports.openFileInEditor = openFileInEditor;
exports.parsereRequestURL = parsereRequestURL;