import * as jwt from "jsonwebtoken";
export const context = ({ req }: any) => {
  let token = req.get("Authorization");
  if (token) {
    console.log("Auth Token Available");
    token = req.get("Authorization").replace("Bearer ", "");
    let decoded = undefined;
    // Verify and decode token
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      // Token verification failed and user is not authenticated
      return {
        authenticated: false,
      };
    }
    // return verified token into context: userid, username, and token
    return {
      authenticated: true,
      userid: decoded.userid,
      username: decoded.username,
      token: decoded.token,
    };
  } else {
    console.log("No Auth Token Available");
    return { authenticated: false };
  }
};
