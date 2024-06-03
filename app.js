require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');
const  mongoose  = require('mongoose');
const app = express();
app.use(expressLayouts);
const port = process.env.PORT || 5000;
//connection db
connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//static files
app.use(express.static('public'));


//express session
app.use(
session({
    secret : 'secret',
    resave :false,
    saveUninitialized :true,
    cookie :{
        maxAge : 1000 * 60 *60 *24 * 7 , // 1week

    }
})
);




//flash massages

app.use(flash({sessionKeyName : 'flashMessage'}));




// templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');


//routes

app.use('/' ,require('./server/routers/customer'));



//handle 404

app.get('*' , (req , res) => {

res.status(404).render('404');

});


app.listen(port, () => {

console.log(`app lisnting on ${port}`)

});
