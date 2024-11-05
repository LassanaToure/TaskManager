import { IncomingMessage, ServerResponse } from "http";

// Define the Task structure
interface Task {
  id: number;
  title: string;
}
//on ajoute notre tableau de taches
function getTasks(req: IncomingMessage, res: ServerResponse, tasks: Task[]): void {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tasks)); // tableau de tâches en une chaîne JSON.
}

export default getTasks;
