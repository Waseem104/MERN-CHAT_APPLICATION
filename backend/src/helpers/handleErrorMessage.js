const handleErrorMessage = (res, error, message) => {
  console.log(message, error.message);
  return res.status(500).json({
    message: "Some Internal Server Error",
    success: false,
    error: error.message,
  });
};

export default handleErrorMessage;
