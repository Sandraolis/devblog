require("dotenv").config();
const mongoose = require("mongoose");
const readline = require("readline");
const User = require("./models/User");

async function connectToMongo() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  try {
    await connectToMongo();

    rl.question("Enter name: ", (name) => {
      rl.question("Enter email: ", (email) => {
        rl.question("Enter password: ", async (password) => {
          const user = await User.create({
            name,
            email,
            password
          });

          console.log("✅ User created:", user.email);

          rl.close();
          mongoose.connection.close();
        });
      });
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
