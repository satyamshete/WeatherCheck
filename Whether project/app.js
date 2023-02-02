const bodyPaser = require ("body-parser")
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyPaser.urlencoded({extended: true}))
app.get("/", function(req, res){
    // const city = "Latur";
    // const appid = "baef4d492700d94e6dccc1f9657a3b87&units=metric"
    // const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid
    // https.get(url, function(response){
    //     console.log(response)
    //     response.on("data",function(data){
    //        // console.log(data) //in hexa decimal
    //         const whetherData = JSON.parse(data);
    //         //console.log(whetherData)
    //        // res.send(whetherData)
    //         const temp = whetherData.main.temp
    //        // res.send("temp is" + temp)
    //        const icon = whetherData.weather[0].icon
    //        const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
         
    //         console.log(temp)
    //         const whetherDescription = whetherData.weather[0].description
    //         res.write("<p>the whether is currently "+ whetherDescription +"</p> ")
    //         res.write("<h1> temperature in Latur is "+temp +" degree Celcius</h1>" )
    //         res.write("<img src="+ imageUrl + ">")
    //        res.send();
        // })
    // })
    //res.send("server sarted")
    res.sendFile(__dirname+"/index.html")
 })
app.post("/", function(req, res){
    console.log(req.body.cityName)
    const city = req.body.cityName;
    const appid = "baef4d492700d94e6dccc1f9657a3b87&units=metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid
    https.get(url, function(response){
        response.on("data",function(data){
            const whetherData = JSON.parse(data);
            const temp = whetherData.main.temp;
            const icon = whetherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            const whetherDescription = whetherData.weather[0].description
            res.write("<p>the whether is currently "+ whetherDescription +"</p> ")
            res.write("<h1> temperature in "+ city +" is "+temp +" degree Celcius</h1>" )
            res.write("<img src="+ imageUrl + ">")
            res.send()
        })
    })

})


app.listen(3000, function(){
    console.log("Server started on port 3000")
})