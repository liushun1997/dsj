const fs=require('fs')
const path=require('path')
const regstyle=/<style>([\s\S]*)<\/style>/
const regscript=/<script>([\s\S]*)<\/script>/
const source=path.join(__dirname,'/素材/index.html')
fs.readFile(source,'utf8',function(err,dataStr){
   if(err) return console.log('读取文件失败'+err.message);
   console.log('读取文件成功!');
   resolveStyle(dataStr)
   resolveScript(dataStr)
   resolveHtml(dataStr)
})
 function resolveStyle(htmlStr){
     const tagetstyle=path.join(__dirname,'/clocka/index.css')
     const newstyle=regstyle.exec(htmlStr)[1]
     fs.writeFile(tagetstyle,newstyle,function(err){
         if(err) return console.log('写入css样式失败'+err.message);
         console.log('写入css样式成功!');
     })
 }
 function resolveScript(htmlStr){
     const tagetscript=path.join(__dirname,'/clocka/index.js')
     const newscript=regscript.exec(htmlStr)[1]
     fs.writeFile(tagetscript,newscript,function(err){
         if(err) return console.log('写入js样式失败'+err.message);
         console.log('写入js样式成功!');
     })
 }
 function resolveHtml(htmlStr){
     const tagethtml=path.join(__dirname,'/clocka/index.html')
     const newhtml=htmlStr.replace(regstyle,'<link rel="stylesheet" href="./index.css">').replace(regscript,'<script src="./index.js"></script>')
     fs.writeFile(tagethtml,newhtml,function(err){
         if(err) return console.log('写入html样式失败'+err.message);
         console.log('写入html样式成功!');
     })
 }
