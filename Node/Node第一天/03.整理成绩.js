const fs = require('fs')
fs.readFile('./素材/成绩.txt', 'utf8', function (err, dataStr) {
  if (err) {
    return console.log('读取文件失败!' + err.message)
  }
  // 2加工文件

  const newStr = dataStr.replace(/=/g, ': ').replace(/(?<!:)\s/g, '\n')
  fs.writeFile('./files4/成绩-ok.txt', newStr, function (err) {
    if (err) return console.log('写入文件失败!' + err.message)
    console.log('成绩写入成功!')
  })
})
