const validateJoiSchema = (joiSchema) => {
  return (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    next();
  };
};

module.exports = validateJoiSchema;
