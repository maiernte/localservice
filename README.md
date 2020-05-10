### 本地应用呼叫器

一个 Node 服务，让Web应用启动本地应用程序。我用来让部署在 localhost 的 docsify 直接打开 Typora 文件编辑器。


###### 1 首先下载项目并解压，或者 git 克隆到本地磁盘。

###### 2 修改服务端参数

需要修改 action.js 当中的 ROOT_Docsify 变量，使其为你在本地的 docsify 文件地址。有需要的话也可以修改服务器的端口，默认为 3001。

###### 3 修改客户端参数

将 docify-edit-on-github.js 文件拷贝到 docisfy 的项目内，并添加到 index.html 入口文件中。 [具体设置请参阅原插件](https://github.com/njleonzhang/docsify-edit-on-github)。

修改 `buildUrl()` 函数中服务器的端口，使其与服务端一致。并将 ‘typora’ 改为自己使用的Markdown编辑器。

`var fileUrl = buildUrl(docName, 'typora')`

###### 4 启动服务并在后台运行

在 linux 或者 windows 上运行 nohup + node 命令就好了。

`> nohup node pathTo/app.js  &`

在 OSX 系统上稍微麻烦一点，要想关闭终端以后服务器还能在后台运行，需要以下方式

`bash -c "nohup sh -c 'node pathTo/app.js' &"`

###### 5 停止在后台的服务

通过以下命令找到服务的后台进程号

```
// 找到服务进程
ps -ef | grep "node /app.js"

// 终止服务 processID 为上述命令结果中的第二列
kill -9 processID

```