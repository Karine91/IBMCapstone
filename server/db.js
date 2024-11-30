const mongoose = require("mongoose");
//temp creds updated every time
const MONGO_HOST = "172.21.249.212";
const MONGO_PASSWORD = "";
const MONGO_USERNAME = "root";
const MONGO_PORT = "27017";

const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
const connectToMongo = async (retryCount) => {
  const MAX_RETRIES = 3;
  const count = retryCount ?? 0;
  try {
    await mongoose.connect(mongoURI, { dbName: "stayhealthybeta1" });
    console.info("Connected to Mongo Successfully");

    return;
  } catch (error) {
    console.error(error);

    const nextRetryCount = count + 1;

    if (nextRetryCount >= MAX_RETRIES) {
      throw new Error("Unable to connect to Mongo!");
    }

    console.info(`Retrying, retry count: ${nextRetryCount}`);

    return await connectToMongo(nextRetryCount);
  }
};

module.exports = connectToMongo;
