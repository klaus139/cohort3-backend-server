// isAdminMiddleware.js
const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user && req.user.isAdmin) {
      // If user is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // If user is not an admin, return a 403 Forbidden status
      res.status(403).json({ message: 'Access denied. You are not authorized to access this resource.' });
    }
  };
  
  export { isAdmin };
  