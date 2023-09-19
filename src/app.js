

// my changes
const path = require('path')
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const hbs = require('hbs')

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,"../public/index.html"));
/**The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application. */
const viewPath =  path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
app.set('view engine','hbs');
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(path.join(__dirname,"../public"))); //we are using static html page

app.get('',(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"Balkrishna"
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Balkrishna"
    })
})

app.get('/help',(rew,res)=>{
    res.render('help',{
        title:"This is help page",
        name:"Balkrishna"
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: "please provide a query string"
        })
    }

    const geocode = require("./utils/geocode.js");
    const forecast = require("./utils/forecast.js");

    //  callback chaining
    const address = req.query.address //type node callback.js udaipur/"New York", note : (it will pass udaipur as argument)
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error //ypu can use short hand syntax here
            })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error){
                return res.send({
                    error
                })
            } 
           
            res.send({
                forecast: forecast,
                location,
                address : req.query.address
            });
        });
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"balkrishna",
        errormessage:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"balkrishna",
        errormessage:"Page not found"
    })
})

//starts the server and listens at a specific port
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})