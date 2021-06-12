const verifyExpert = async (req, res, next) => {
  if (req.role !== 'expert') {
    return res
      .status(403)
      .json({ success: false, message: 'Do not have permission' });
  }

  next();
};

module.exports = verifyExpert;
