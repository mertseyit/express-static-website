const createCustomErrorMsg = (error) => {
  if (error.name === 'SequelizeUniqueConstraintError')
    return error.errors[0].message;
  return error.message;
};

module.exports = createCustomErrorMsg;
