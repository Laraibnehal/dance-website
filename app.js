const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
 mongoose.connect('mongodb://localhost:27017/contactDance');

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String,
  });
  const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')//select the template engine as pug
app.set("views", path.join(__dirname ,'views')) //set the views directory 

//ENDPOINTS
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })

    // res.status(200).render('contact.pug')
})

// START THE SERVER

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
});
