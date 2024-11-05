import React, { useState, useEffect } from "react";

const TaskManager = () => {
   //etat initial
  const [tasks, setTasks] = useState([]);//Notre tableau de taches
  const [title, setTitle] = useState(""); //titre de la tâche
  const [error, setError] = useState(null);// les erreurs initialisees a null

  useEffect(() => { //requête initiale pour recuperer les taches
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    
      fetch("http://localhost:3000/tasks")
      //HTTP GET à l'URL spécifiée.
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setTasks(data)})
        .catch(err => {
          console.error("Erreur lors de la récupération des tâches:", err);
          setError("Erreur lors de la récupération des tâches.");
        });
    }
  

  const addTask = (e) => {
    e.preventDefault();
    setError(null);
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }), //Convertit le titre en JSON pour l'envoyer
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de la création de la tâche.");
          }
          return response.json();
        })
        .then(newTask => {
          setTasks([...tasks, newTask]);//// Ajoute la nouvelle tâche à la liste des tâches
          setTitle("");// Ajoute la nouvelle tâche à la liste des tâches
        })
        .catch(err => {
          console.error("Erreur console lors de la création de la tâche:", err);
          setError("Erreur lors de la création de la tâche.");
        });
    } 
  

  return (
    <div>
      <h1>Task Manager</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Si error n'est pas null on affiche le msg */}
      <ul>
     {/* task est un tableau donc map pour recuperer chaque element avec ses donnees */}
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskManager;
