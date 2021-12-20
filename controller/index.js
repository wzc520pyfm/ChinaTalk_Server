// let redis=require("../db/redisDB")
const querySql = require("../db/mysqlDB");
const util = require("../utils/common");
const { PWD_SALT, PRIVATE_KEY, EXPIRESD } = require("../utils/constant");
const { md5 } = require("../utils/index");
const jwt = require("jsonwebtoken");

// 获取body参数通过req.body, 获取query传参通过req.query, 获取token参数通过req.user

// 如果是query传参, 直接: @param {string} username.query.required
/**
 * 用户信息注册
 * @route POST /chinatalk/newUser
 * @group user - 用户相关接口
 * @summary 注册
 * @param {string} username.query.required - 用户名
 * @returns {object} 200 - 与用户信息相关的数组
 * @returns {Error} default - Unexpected error
 * @security JWT
 */

//用户注册API
exports.userRegister = async (req, res, next) => {
  let { Username, Userpsd, Userphone } = req.query;
  try {
    let user = await querySql("select * from user where username = ?", [
      Username,
    ]);
    if (!user || user.length === 0) {
      // 对密码加密后存入数据库
      // password = md5(`${Userpsd}${PWD_SALT}`);
      await querySql(
        "INSERT INTO user( Username, Userpsd, Userphone) VALUES(?,?,?)",
        [Username, Userpsd, Userphone]
      );
      res.json(util.buildSuccess("注册成功"));
    } else {
      res.json(util.buildError("账号已注册"));
    }
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//用户登录API
exports.userLogin = async (req, res, next) => {
  let { Userpsd } = req.query;
  try {
    let results = await querySql("SELECT * FROM user WHERE Userpsd = ?", [
      Userpsd,
    ]);
    res.json(util.buildSuccess("登录成功", { list: results }));
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//更改用户密码API
exports.updatePsd = async (req, res, next) => {
  let { Userphone, Username, Userpsd } = req.query;
  try {
    let results = await querySql(
      "UPDATE User SET Userpsd = ? WHERE Userphone = ?",
      [Userpsd, Userphone]
    );
    if (results.changedRows === 1) {
      res.json(util.buildSuccess("修改成功"));
    } else {
      res.json(util.buildError("修改失败"));
    }
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//查询所有单词API---单词解释题目---真题测试
exports.findAllWords = async (req, res, next) => {
  try {
    let results = await querySql("SELECT * FROM word");
    res.json(util.buildSuccess("查询成功", { list: results }));
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//查询所有词性选择题---关键字题目----select题
exports.findAllSelectQues = async (req, res, next) => {
  try {
    let results = await querySql("SELECT * FROM select_ques");
    res.json(util.buildSuccess("查询成功", { list: results }));
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//查询特定用户的所有错题id---查询Uno为1的,代表1用户做错的
exports.findCollect = async (req, res, next) => {
  let { Uno } = req.query;
  try {
    let results = await querySql("SELECT * FROM collect where Uno=?", [Uno]);
    res.json(util.buildSuccess("查询成功", { list: results }));
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//新增错题--传入Uno(用户id)和q_id(题目id) --仅限趣味答题-
exports.collect = async (req, res, next) => {
  let { Uno, q_id } = req.query;
  try {
    let results = await querySql(
      "INSERT INTO collect( Uno, q_id) VALUES(?,?)",
      [Uno, q_id]
    );
    if (results.affectedRows === 1) {
      res.json(util.buildSuccess("插入成功"));
    } else {
      res.json(util.buildError("插入失败"));
    }
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

// 取消收藏----将错题删除---删除某一个错题
exports.cancleCollect = async (req, res, next) => {
  let { Uno, q_id } = req.query;
  try {
    let results = await querySql(
      "DELETE FROM collect WHERE Uno = ? AND q_id = ?",
      [Uno, q_id]
    );
    if (results.affectedRows === 1) {
      res.json(util.buildSuccess("删除成功"));
    } else {
      res.json(util.buildError("删除失败"));
    }
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//查询所有看图识物题
exports.findGame = async (req, res, next) => {
  try {
    let results = await querySql("SELECT * FROM game_ques");
    res.json(util.buildSuccess("查询成功", { list: results }));
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};

//查询指定的一个看图识物题目
exports.findOneGame = async (req, res, next) => {
  let { q_id } = req.query;
  try {
    let results = await querySql("SELECT * FROM game_ques where q_id=?", [
      q_id,
    ]);
    res.json(util.buildSuccess("查询成功", { list: results }));
  } catch (e) {
    console.log(e);
    // 将错误交由错误中间件处理
    next(e);
  }
};
