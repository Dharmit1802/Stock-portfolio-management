import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    // console.log(token);
    if (!token) return res.status(401).json("Unauthorized access");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not Valid!!");
      req.user = user;

      next();
    });
  } catch (error) {
    res.status(401).json("can't found access token !!");
  }
};

export default auth;
