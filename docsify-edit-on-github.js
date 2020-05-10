;(function(win) {
  function isFunction(functionToCheck) {
   return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  }

  win.EditOnGithubPlugin = {}

  function buildUrl(fileurl, app) {
    let body = {
      para: fileurl,
      application: app
    };

    // let params = encodeURIComponent(JSON.stringify(body));
    let params = window.btoa(JSON.stringify(body));
    let url = `http://localhost:3001/lauch?params=${params}`
    return url
  }

  function create(docBase, docEditBase, title) {
    title = title || 'Edit on github'
    docEditBase = docEditBase || docBase.replace(/\/blob\//, '/edit/')

    function editDoc(event, vm) {
      var docName = vm.route.file
      if (docName) {
        var host = win.location.host;
        var localhost = host != docEditBase
        if (localhost) {
          var fileUrl = buildUrl(docName, 'typora')
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", fileUrl, false ); // false for synchronous request
          xmlHttp.send( null );
          console.log('xmlHttp', xmlHttp.responseText)
        } else {
          var editLink = docEditBase + docName
          window.open(editLink)
        }
        
        event.preventDefault()
        return false
      } else {
        return true
      }
    }

    win.EditOnGithubPlugin.editDoc = editDoc

    function generateHeader(title) {
      return header = [
        '<div style="overflow: auto">',
        '<p style="float: right"><a style="text-decoration: underline; cursor: pointer"',
        'onclick="EditOnGithubPlugin.onClick(event)">',
        title,
        '</a></p>',
        '</div>'
      ].join('')
    }

    return function(hook, vm) {
      win.EditOnGithubPlugin.onClick = function(event) {
        EditOnGithubPlugin.editDoc(event, vm)
      }

      if (isFunction(title)) {

        hook.afterEach(function (html) {
          return generateHeader(title(vm.route.file)) + html
        })
      } else {
        var header = generateHeader(title)

        hook.afterEach(function (html) {
          return header + html
        })
      }


    }
  }

  win.EditOnGithubPlugin.create = create
}) (window)