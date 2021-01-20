const mongoose = require("mongoose");

const url =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.dr5gp.mongodb.net/rest-tutorial?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
