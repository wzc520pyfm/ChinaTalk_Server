//

var express = require("express");
var router = express.Router();
const { upload } = require("../utils/index");
//引入处理逻辑的JavaScript文件
var {
  userRegister,
  userLogin,
  updatePsd,
  findAllWords,
  findAllSelectQues,
  findCollect,
  collect,
  cancleCollect,
  findGame,
  findOneGame,
} = require("../controller/index");

//注册
router.post("/newUser", userRegister);
//登录
router.post("/Login", userLogin);
//更改密码
router.post("/updatePsd", updatePsd);
//查询所有单词---单词解释题目---真题测试
router.post("/findAllWords", findAllWords);
//查询所有词性选择题---关键字题目----select题
router.post("/findAllSelectQues", findAllSelectQues);
//查询特定用户的所有错题id---查询Uno为1的,代表1用户做错的
router.post("/findCollect", findCollect);
//新增错题--传入Uno(用户id)和q_id(题目id) --仅限趣味答题
router.post("/collect", collect);
// 取消收藏----将错题删除---删除某一个错题
router.post("/cancleCollect", cancleCollect);
// 查询所有看图识物题-
router.post("/findGame", findGame);
//查询指定的一个看图识物题目
router.post("/findOneGame", findOneGame);

module.exports = router;
