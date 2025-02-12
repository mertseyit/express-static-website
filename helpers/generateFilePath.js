const generateFilePath = (file_name, folder_position) => {
  const filePath = `http://${process.env.API_HOST}:${process.env.API_PORT}/${folder_position}/${file_name}`;
  return filePath;
};

module.exports = generateFilePath;
