"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function postTask(req, res, tasks) {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const { title } = JSON.parse(body);

      if (!title || typeof title !== "string") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Title is required and must be a string." }));
        return;
      }

      const newTask = {
        id: Math.floor(Math.random() * 1000), 
        title: title,
      };

      tasks.push(newTask);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newTask));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
}

exports.default = postTask;
