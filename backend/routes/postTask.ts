import { ServerResponse, IncomingMessage } from "http";

// Same as getTask
interface Task {
  id: number;
  title: string;
}

   
function postTask(req: IncomingMessage, res: ServerResponse, tasks: Task[]): void {

  //va contenir les données du corps
  // de la requête au fur et à mesure qu'elles sont reçues.
  let body = "";
  
//on surveille data et on convertit chaque morceau de données(chunk) et on l'ajoute au body 

  req.on("data", chunk => {
    body += chunk.toString();
  });


  // On recupere la valeur du champ title
  req.on("end", () => {
    try {
      const { title } = JSON.parse(body);

        //Si title est manquant ou n'est pas une chaîne de caractères alors...
      if (!title || typeof title !== "string") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Title is required and must be a string." }));
        return;
      }
     //... Autrement
      const newTask: Task = {
        id: Math.floor(Math.random() * 1000), // Pour avoir avoir un id aleatoire
        title,
      };

      tasks.push(newTask);//on ajoute la tâche au tableau

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newTask)); //le serveur renvoie cette nouvelle tâche
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
}

export default postTask;
