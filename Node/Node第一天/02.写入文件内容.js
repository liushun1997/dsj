const fs=require('fs')
fs.writeFile('./files4/1.txt','ok123',function(err){
    if(err) return console.log('写入文件失败!'+err);
    console.log('文件写入成功!');
})