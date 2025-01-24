// const { getUser } = require("../service/auth");

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // console.log(req);
//   const userUid = req.cookies?.uid;
//   if (!userUid) {
//     return res.redirect("/login");
//   }

//   const user = getUser(userUid);
//   if (!user) {
//     return res.redirect("/login");
//   }

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // console.log(req);
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

// module.exports = { restrictToLoggedinUserOnly, checkAuth };

// const { getUser } = require("../service/auth");

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // console.log(req);
//   const userUid = req.headers["Authorization"];
//   if (!userUid) {
//     return res.redirect("/login");
//   }

//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   if (!user) {
//     return res.redirect("/login");
//   }

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // console.log(req.cookies, "hello");
//   // const userUid = req.cookies?.uid;
//   // const user = getUser(userUid);
//   const userUid = req.headers["authorization"];
//   const token = userUid?.split("Bearer ")[1];
//   const user = getUser(token);

//   // if (!user) return res.redirect("/login");
//   // console.log(user, "hii", userUid);
//   req.user = user;
//   next();
// }

// module.exports = { restrictToLoggedinUserOnly, checkAuth };

//authericzation

const { getUser } = require("../service/auth");

function checkForAUthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // ) {
  //   return next();
  // }
  // const token = authorizationHeaderValue.split("Bearer ")[1];
  // const user = getUser("token");
  // req.user = user;
  // next();
  const tokenCookie = req.cookies?.token;
  req.user = null;
  // console.log(tokenCookie, "hii");
  if (!tokenCookie) {
    return next();
  }
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  // console.log(user);
  return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    // console.log(req.user);

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    next();
  };
}

module.exports = { checkForAUthentication, restrictTo };
