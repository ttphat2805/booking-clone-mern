import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(` MongoDB Connect Successfully `.bgMagenta);
  } catch (error) {
    console.log(`Error MongoDB Connect Failed`);
    process.exit();
  }
};

export default connectDB;
