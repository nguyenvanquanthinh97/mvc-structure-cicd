const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    });
  }
  next();
}

const asyncHandler = fn => (req, res, next) => {
  return fn(req, res, next).catch(next);
}

module.exports = {
  requireAuth,
  asyncHandler
}

