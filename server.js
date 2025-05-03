const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const port = 3019;
const app = express();

app.use(express.static(__dirname)); // optional, for serving CSS/JS
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/contact')
const db =mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection succesfuul")
})
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    text:String


})
const Users= mongoose.model("data",userSchema)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/post', async (req, res) => {
    const { name, email, number, text } = req.body;
    console.log("Received data:", req.body); // Add this line
  
    const user = new Users({ name, email, number, text });
    await user.save();
  
    console.log("Saved user:", user);
    res.send("Form submission successful");
  });

app.listen(port, () => {
  console.log("Server started on port", port);
});
