const fs = require('fs')
const path = require('path')
const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/
const source = path.join(__dirname, '/素材/index.html')
fs.readFile(source, 'utf8', function (err, dataStr) {
  if (err) return console.log('读取文件失败' + err.message)
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHtml(dataStr)
})
function resolveCSS(htmlStr) {
  const newCSS = regStyle.exec(htmlStr)[1]
  const targetCss = path.join(__dirname, '/clock/index.css')
  fs.writeFile(targetCss, newCSS, function (err) {
    if (err) return console.log('写入css样式失败!' + err.message)
    console.log('写入样式文件成功!')
  })
}
function resolveJS(htmlStr) {
  const newJS = regScript.exec(htmlStr)[1]
  const targetJs = path.join(__dirname, '/clock/index.js')
  fs.writeFile(targetJs, newJS, function (err) {
    if (err) return console.log('写入js样式失败' + err.message)
    console.log('写入js样式成功1')
  })
}
function resolveHtml(htmlStr) {
  const newHtml = htmlStr.replace(regStyle, ' <link rel="stylesheet" href="./index.css">').replace(regScript, ' <script src="./index.js"></script>')
  const targetHtml = path.join(__dirname, '/clock/index.html')
  fs.writeFile(targetHtml, newHtml, function (ree) {
    if (ree) return console.log('写入HTML文件失败' + ree.message)
    console.log('写入HTML文件成功!')
  })
}
