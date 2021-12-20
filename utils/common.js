//存放通用的方法或验证内容

let util = {};
util.buildSuccess = (msg = "", obj = {}) => {
  //格式化返回数据格式---成功
  if (!data) {
    data = {};
  }
  return {
      retcode: 0,
      msg: msg,
      obj: obj
  };
};
util.buildError = (...args) => {
  //格式化返回数据格式---出错
  if (!args[args.length - 1]) {
    data = [];
  }
  let resData = [
      {
        code: -1,
        message: args[0],
        data: []
      },
      {
        code: -1,
        message: args[0],
        data: args[1]
      },
      {
        code: args[0],
        message: args[1],
        data: args[2]
      },
  ]
  switch(args.length){
      case 1:
        return resData[0];
      case 2:
        return resData[1];
      case 3:
        return resData[2];  
  }
};
//转化为格式化时间
util.getLocalDate = (t) => {
  let date = new Date(parseInt(t));
  return (
    date.getFullYear() +
    "-" +
    (parseInt(date.getMonth()) + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
};

module.exports = util;
