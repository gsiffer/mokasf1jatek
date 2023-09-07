import mongoose from "mongoose";

const connectDB = (url) => {
  // mongoose 6 or higher
  return mongoose.connect(url);

  // mongoose 5 or less
  // return mongoose.connect(url, {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  //   useUnifiedTopology: true,
  // });
};

export default connectDB;
