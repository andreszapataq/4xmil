const app = require("./app");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const DB = process.env.DB_URI;
console.log(DB);

app.listen(4000, () => {
    console.log("Server running on port 4000");
});

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
    console.log("CONECTADO PAPI!");
}).catch(err => console.log("MI ERROR: " + err));