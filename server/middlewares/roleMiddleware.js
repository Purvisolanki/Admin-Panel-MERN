// middlewares/roleMiddleware.js
const roleMiddleware = (role) => (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  export default roleMiddleware;
  