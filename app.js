const express = require("express");
const app = express();
const https = require("https");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){

  const query = req.body.CityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=fad0217c315aa859a9a4784cf17e3d41&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<html><h2>The weather is currently "+description+" .</h2></html>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celsius.</h1>");
      res.write("<html><img src="+imageUrl+"></html>");
      if(temp>0 && temp<10){
        res.write("<html><h3 >Oooo!!Chilly!Don't forget your sweater.</h3></html>");
      }
      if(temp>=10 && temp<25){
        res.write("<html><h3 >Nice!Step outside, don't forget your mask and buy a BLAHAJ.</h3></html>");
      }
      else{
        res.write("<html><h3 >Have a melon and relax under the fan!!</h3></html>");
        
      }
      res.send();
    });
  });

});





app.listen(3000 , function(){
  console.log("Server started on port 3000");
});
