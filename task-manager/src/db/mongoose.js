const mongoose = require("mongoose");

// const uri = "mongodb+srv://nishaposwal:Ankitkp@cluster0.83b5x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri = "mongodb://127.0.0.1/task-manager-api"
  const connect = async ()=> {
   await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }


 module.exports = connect


