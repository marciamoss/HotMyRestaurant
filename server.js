// Dependencies
// =============================================================
const express = require("express");
const path = require("path");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


const tables=[],waitList=[];
// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const reserveTable = req.body;
  
   if(tables.length<5){ 
        tables.push(reserveTable);
        
   }else{
        waitList.push(reserveTable);
   }

    //send data to api links
    app.get("/api/tables", function(req, res) {
        return res.json(tables);
    });
    app.get("/api/waitlist", function(req, res) {
        return res.json(waitList);
    });
  
    res.json(reserveTable);


});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  