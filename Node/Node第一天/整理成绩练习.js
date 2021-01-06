const fs=require('fs')
const path=require('path')
const duqu=path.join(__dirname ,'/素材/成绩.txt')
fs.readFile(duqu,'utf8',function(err,dataStr){
    if(err) return console.log('读取成绩失败'+err.message);
    const newStr=dataStr.replace(/=/g,': ').replace(/(?<!:)\s/g,'\n')
    const xiogai=path.join(__dirname,'/files4/成绩练习')
    fs.writeFile(xiogai,newStr,function(err){
        if(err) return console.log('写入成绩失败!'+err.message);
        console.log('写入成绩成功!');
    })
})
