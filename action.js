const getRawBody = require('raw-body');
var cp = require("child_process");
const open = require('open');

const ROOT_Docsify = '/Users/mai/projects/tianyawiki/docs/'

const config = require('./config.json')

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
      return resolve(body)
    }catch(err){
      return reject(err)
    }
  })
}

function getUrl(data) {
  var url = data.para
  var absolut = false

  if (typeof(data.absolut) == 'undefined' || data.absolut == null) {
    absolut = data.para.startsWith('/')
  } else {
    absolut = data.absolut
  }

  if (!absolut) {
    url = ROOT_Docsify + data.para
  }

  return url;
}

function getEditor(data) {
  var noeditor = typeof(data.application) == 'undefined' || data.application == null 
  if (noeditor) {
    var items = data.para.split('.')
    var fileExtension = items[items.length - 1]
    
    var editor = config.editors[fileExtension]||  config.defaut_editor
    return editor
  } else {
    return data.application
  }
}

async function openFileInEditor(data) {
  return new Promise((resolve, reject) => {
    var fileurl = getUrl(data)
    var editor = getEditor(data)

    open(fileurl, {app: editor})
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