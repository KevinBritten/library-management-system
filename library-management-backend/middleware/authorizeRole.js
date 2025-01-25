import UserService from "../services/UserService.js";

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const userService = new UserService();
    try {
      const { username } = req.body;
      const user = userService.getUserByUsername(username);
      const { role } = user;
      if (role !== requiredRole)
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permission" });
      next();
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Forbidden: Authorization error" });
    }
  };
};

export default authorizeRole;
