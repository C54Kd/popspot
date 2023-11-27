const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateServiceAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next("엑세스 토큰이 없습니다.");
    }
    let email;

    jwt.verify(
      authorization,
      process.env.ACCESS_TOKEN_SECERT,
      (err, decoded) => {
        if (err) {
          throw new Error("엑세스 토큰이 유효하지 않습니다.");
        } else {
          console.log("여기11", decoded.user.email);
          email = decoded.user.email;
        }
      }
    );
    // 1. 서비스관리자인지(admin_role이 2인지 확인)

    const user = await User.findOne({ email }).select("admin_role");
    console.log("여기22", user);
    if (user.admin_role === 2) {
      next();
    } else {
      throw new Error("서비스 관리자가 아닙니다.");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = validateServiceAdmin;
