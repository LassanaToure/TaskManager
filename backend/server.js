"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var getTasks_1 = require("./routes/getTasks");
var postTask_1 = require("./routes/postTask");
var PORT = 3000;
// Initial tasks array 
var tasks = [];
var server = http.createServer(function (req, res) {
    // Ajout des en-têtes CORS 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // Répondre aux requêtes OPTIONS 
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }
    //on verifie la methode et url dans les 2 cas
    if (req.method === "GET" && req.url === "/tasks") {
        (0, getTasks_1.default)(req, res, tasks);
    }
    else if (req.method === "POST" && req.url === "/tasks") {
        (0, postTask_1.default)(req, res, tasks);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
    }
});
server.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
