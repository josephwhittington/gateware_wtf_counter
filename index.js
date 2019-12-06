// pastebin.com/B8
// mongodb+srv://whittington:all4one2@cluster0-yzp49.mongodb.net/test?retryWrites=true&w=majority

// Utility
const fs = require("fs");

// Middleware shit
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");

// Express shit
const express = require("express");
const app = express();

// constants
const SERVER_PORT = 3000;
const pass = "lari_cheats";

// Setup middleware
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // allows me to parse the request body

// Helper functions
const GetObjData = () => {
    // Read file
    const data = fs.readFileSync("./data/db.json");

    dataObj = JSON.parse(data);
    console.log(dataObj);

    return {
        lari: dataObj.lari,
        other: dataObj.other,
        total: dataObj.lari + dataObj.other
    };
};

app.get("/", (req, res) => {
    res.render("home", GetObjData());
});

app.post("/auth", (req, res) => {
    console.log("password: ", req.body.password);

    if (req.body.password === "lari_cheats") {
        return res.json({
            success: true,
            message: "Ip authenticated"
        });
    }

    return res.json({
        success: false,
        message: "Token does not match"
    });
});

app.get("/increment", (req, res) => {
    res.render("increment");
});

app.post("/increment", (req, res) => {
    console.log(req.body);

    if (req.body.password === "lari_cheats") {
        // Bruh
        let data = GetObjData();
        console.log(data);
        let datanew = {
            lari: data.lari,
            other: data.other + 1
        };
        fs.writeFileSync("./data/db.json", JSON.stringify(datanew), "utf-8");
        return res.redirect("/");
    }

    return res.json({
        success: false,
        message: "Token does not match - you got me fucked up"
    });
});

app.get("/incrementlari", (req, res) => {
    res.render("incrementlari");
});

app.post("/incrementlari", (req, res) => {
    console.log(req.body);

    if (req.body.password === "lari_cheats") {
        // Bruh
        let data = GetObjData();
        console.log(data);
        let datanew = {
            lari: data.lari + 1,
            other: data.other
        };
        fs.writeFileSync("./data/db.json", JSON.stringify(datanew), "utf-8");
        return res.redirect("/");
    }

    return res.json({
        success: false,
        message: "Token does not match - you got me fucked up"
    });
});

app.post("/reset", (req, res) => {
    let datanew = {
        lari: 0,
        other: 0
    };
    fs.writeFileSync("./data/db.json", JSON.stringify(datanew), "utf-8");

    res.json(datanew);
});

app.listen(SERVER_PORT, () => {
    console.log(`Starting server on port ${SERVER_PORT}`);
});
