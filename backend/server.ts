import * as http from "http";
import getTasks from "./routes/getTasks";
import postTask from "./routes/postTask";

const PORT = 3000;

// Define the Task type
interface Task {
  id: number;
  title: string;
}

// Initial tasks array
let tasks: Task[] = [];


const server = http.createServer((req, res) => {
  // Ajout des en-têtes CORS 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

// Répondre aux requêtes OPTIONS 
if (req.method === "OPTIONS") {
   res.writeHead(204);
    res.end(); return;
}

  //on verifie la methode et url dans les 2 cas
  if (req.method === "GET" && req.url === "/tasks") {
    getTasks(req, res, tasks);
  } else if (req.method === "POST" && req.url === "/tasks") {
    postTask(req, res, tasks);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
