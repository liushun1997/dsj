const fs=require('fs')
const path=require('path')
const regstyle=/<style>([\s\S]*)<\/style>/
const regscript=/<script>([\s\S]*)<\/script>/
const source=path.join(__dirname,'/素材/index.html')
fs.readFile(source,'utf8',function(err,dataStr){
    if(err) return console.log('读取文件失败'+err.message);
    console.log('读取文件成功');
    resolveStyle(dataStr)
    resolveScript(dataStr)
    resolveHtml(dataStr)
})
function resolveStyle(htmlStr){
    const newstyle=regstyle.exec(htmlStr)[1]
    const tagetstyle=path.join(__dirname,'/clocks/index.css')
    fs.writeFile(tagetstyle,newstyle,function(err){
        if(err) return console.log('写入css样式失败'+err.message);
        console.log('写入css样式成功!');
    })
}
function resolveScript(htmlStr){
    const newscript=regscript.exec(htmlStr)[1]
    const tagetscript=path.join(__dirname,'/clocks/index.js')
    fs.writeFile(tagetscript,newscript,function(err){
        if(err) return console.log('写入js文件失败'+err.message);
        console.log('写入js文件成功!');
    })
}
function resolveHtml(htmlStr){
    const tagethtml=path.join(__dirname,'/clocks/index.html')
    const newhtml=htmlStr.replace(regscript,' <script src="/index.js"></script>').replace(regstyle,' <link rel="stylesheet" href="/index.css">')
    fs.writeFile(tagethtml,newhtml,function(err){
        if(err) return console.log('写入的html文件失败'+err.message);
        console.log('写入html文件成功');
    })
}
