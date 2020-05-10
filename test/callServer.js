const request = require('request')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const basicuri = 'http://localhost:3001'
function btoaUTF8(str) { 
  return Buffer.from(str, 'utf8').toString('base64'); 
}
function atobUTF8(b64Encoded) {
  return Buffer.from(b64Encoded, 'base64').toString('utf8');
}

async function invokeServer(body, path){
  let bodyText = JSON.stringify(body)
  let uri = basicuri + path 

  let options = {
    method: 'POST',
    uri: uri,
    headers: {
      'Content-Type': 'application/text'
    },
    body: bodyText
  }

  console.log('call Server', uri)
  return new Promise((resolve, reject) => {
    request.post(uri, options, (err, res, bodyres)=>{
      if (err) {
        reject(err)
      } else {
        resolve(bodyres)
      }
    })
  })
}

async function getReques(body, path) {
  let bodyText = JSON.stringify(body)
  let uri = basicuri + path 

  let options = {
    method: 'GET',
    uri: uri,
    headers: {
      'Content-Type': 'application/text'
    },
  }

  let params = btoaUTF8(JSON.stringify(bodyText));
  //let params = encodeURIComponent(JSON.stringify(bodyText));
  let uriwithparams = `${uri}?params=${params}`

  console.log('call Server', uriwithparams)
  console.log('encodeURI  ', encodeURIComponent(JSON.stringify(bodyText)))
  return new Promise((resolve, reject) => {
    request.get(uriwithparams, options, (err, res, bodyres)=>{
      if (err) {
        reject(err)
      } else {
        resolve(bodyres)
      }
    })
  })
}

async function OpenMDFile(fileurl) {
  let body = {
    para: fileurl,
    application: 'typora'
  };

  invokeServer(body, '/lauch').then(data => {
    console.log(data)
  }).catch(err => {
    console.error(err)
  })
}

async function OpenMDFileBrowser(fileurl) {
  let body = {
    para: fileurl,
    application: 'typora'
  };

  getReques(body, '/lauch').then(data => {
    console.log(data)
  }).catch(err => {
    console.error(err)
  })
}

// npm install xmlhttprequest
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
function httpGet(fileurl)
{
    let body = {
      para: fileurl,
      application: 'typora'
    };
    let uri = basicuri + '/lauch'

    let params = btoaUTF8(JSON.stringify(body));
    let theUrl = `${uri}?params=${params}`
    console.log(theUrl)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// decodeURI
//OpenMDFile('/Users/mai/projects/tianyawiki/docs/README.md')
//OpenMDFileBrowser('/Users/mai/projects/tianyawiki/docs/README.md')
httpGet('README.md')