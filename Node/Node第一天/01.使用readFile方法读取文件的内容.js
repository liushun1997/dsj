const fs=require('fs')
fs.readFile('./files4/1.txt','utf8',function(err,data){
    
    if(err) return console.log('读取失败',err);
    console.log(data);
})