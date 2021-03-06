var http = require('http')        // HTTP服务器API

var fs = require('fs')            // 文件系统API
var path = require('path')

var server = new http.Server()    // 创建新的HTTP服务器

var port = 8000

server.listen(port)            // 在端口8000伤运行它

var log = require('util').log
log('Http Server is listening ' + port + ' port.')

// Node使用'on'方法注册事件处理程序

// 当服务器收到新请求,则运行函数处理它

server.on('request', function (request, response) {
  var filename = null

    // 解析请求的URL
  if (request.method == 'OPTIONS') {
    response.setHeader('Content-Type', 'json')
    response.setHeader('access-control-allow-origin', '*')
    response.setHeader('access-control-allow-headers', 'file-name,Content-Type')
    response.end()
    return
  }
  var url = require('url').parse(request.url)

  switch (url.pathname) {

    case '/upload':
      var _fileName = request.headers['file-name']
      log(_fileName)

      var buffers = []
      var nread = 0
      request.on('data', function (trunk) {
        buffers.push(trunk)
        nread += trunk.length
      })
      request.once('end', function () {
        var buffer = null
        switch (buffers.length) {
          case 0:
            buffer = new Buffer(0)
            break
          case 1:
            buffer = buffers[0]
            break
          default:
            buffer = new Buffer(nread)
            for (let i = 0, pos = 0, l = buffers.length; i < l; i++) {
              var trunk = buffers[i]
              trunk.copy(buffer, pos)
              pos += trunk.length
            }
            break
        }

        log(buffer.length)
        var _serverfilename = 'product' + Date.parse(new Date()) + _fileName.substring(_fileName.lastIndexOf('.'))
        fs.writeFile(path.join(__dirname, 'upload', _serverfilename), buffer)
        var fileurl = 'http://localhost:8000/imageserver/upload/' + _serverfilename
        var json = JSON.stringify({
          'fileurl': fileurl
        })
        response.setHeader('Content-Type', 'json')
        response.setHeader('access-control-allow-origin', '*')
        response.setHeader('access-control-allow-headers', 'file-name,Content-Type')
        response.write(json)
        response.end()
      })
      break
    case '/' || '/index.html' :
      filename = 'index.html'
      break
    default:

      filename = filename || url.pathname.substring(1)  // 去掉前导'/'

        // 基于其扩展名推测内容类型

      var type = (function (_type) {
        switch (_type) { // 扩展名

          case 'html':

          case 'htm': return 'text/html; charset=UTF-8'

          case 'js': return 'application/javascript; charset=UTF-8'

          case 'css': return 'text/css; charset=UTF-8'

          case 'txt': return 'text/plain; charset=UTF-8'

          case 'manifest': return 'text/cache-manifest; charset=UTF-8'

          default: return 'application/octet-stream'

        }
      }(filename.substring(filename.lastIndexOf('.') + 1)))

        // 异步读取文件,并将内容作为单独的数据块传回给回调函数

        // 对于确实很大的文件,使用API fs.createReadStream()更好

      fs.readFile(filename, function (err, content) {
        if (err) {
 // 如果由于某些原因无法读取文件

          response.writeHead(404, {'Content-type': 'text/plain; charset=UTF-8'})

          response.write(err.message)
        } else {
 // 否则读取文件成功

          response.writeHead(200, {'Content-type': type})

          response.write(content) // 把文件内容作为响应主体
        }

        response.end()
      })

  }
})
