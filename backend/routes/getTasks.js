"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function getTasks(req, res, tasks) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tasks));
}
exports.default = getTasks;
