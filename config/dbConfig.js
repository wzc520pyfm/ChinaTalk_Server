// redis配置
// exports.redisConfig={
//     host:'127.0.0.1',
//     port:'6379',
//     ttl:5*60*1000
// }

// mysql配置
let dbOption

dbOption = {
  connectionLimit: 10,
  host: '119.45.102.83',
  user: 'root',
  password: 'wzc520pyf',
  port: '3306',
  database: 'test'
}

module.exports = dbOption