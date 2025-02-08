const generateFilePath = (file_name) => {
  const filePath = `http://${process.env.API_HOST}:${process.env.API_PORT}/img/blogs/${file_name}`;
  return filePath;
};

module.exports = generateFilePath;
