const fs=require('fs')
const path=require('path')
console.log(123);
fs.readFile(path.join(__dirname,'/素材/成绩.txt'), 'utf8', function (err, dataStr) {
    if (err) {
      return console.log('读取文件失败!' + err.message)
    }
    console.log(dataStr);

})