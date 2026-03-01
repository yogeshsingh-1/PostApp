const allowedOrigins = [
  "https://erp365.in",
  "https://erpqa.mygstcafe.com",
  "http://localhost:3000",
  "https://localhost:3000",
];
const corsOption = (req, callback) => {
  const origin = req.headers.origin;
  if (!origin) {
    // allow non-browser tools like Postman kyuki woh same origin mai hote hai isiliye no error
    return callback(null, { origin: false });
  }

  if (allowedOrigins.includes(origin)) {
    return callback(null, {
      origin: origin,
      credentials: true,
    });
  }
  return callback(new Error("Not allowed by CORS"));
};

export default corsOption;
