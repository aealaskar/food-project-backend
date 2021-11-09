const mongoose = require("mongoose");
// REVIEW: Put this file in the gitignore or mongodb might block your account xD
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://ahmad:ahmad1997@cluster0.sgyky.mongodb.net/Cluster0?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
