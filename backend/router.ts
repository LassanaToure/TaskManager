import { IncomingMessage, ServerResponse } from 'http';
import getTasks from './routes/getTasks';
import postTask from './routes/postTask';

interface Task { 
  id: number; 
  title: string;
}

let tasks: Task[] = [];

function router(req: IncomingMessage, res: ServerResponse): void {
  const { method, url } = req;

  if (method === 'GET' && url === '/tasks') {
    return getTasks(req, res, tasks);
  }

  if (method === 'POST' && url === '/tasks') {
    return postTask(req, res, tasks);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}

export default router;
