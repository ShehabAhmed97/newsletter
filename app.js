const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const member = {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME":firstName,
            "LNAME":lastName
        }
    }

    const jsonData = JSON.stringify(member);
    
    const dc = "us5";
    const list_id = "8fa1992a9b";
    const api = `https://${dc}.api.mailchimp.com/3.0/lists/${list_id}/members?skip_merge_validation=true`
    const options = {
        method : "POST",
        auth : "shehab1197:9014360d1859252759e004f6ef8e2415-us5" 
    };

    const request = https.request(api, options, function(response){
        const statusCode = response.statusCode;
        console.log(statusCode);
        
        if(statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failed.html");
        }
    })

    request.write(jsonData);
    request.end();

    console.log(`${firstName}  ${lastName}  ${email}`)

})

app.post("/tryAgain", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("This serever is running on port 3000 ...");
})