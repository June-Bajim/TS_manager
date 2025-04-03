import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      await api.post("/tasks", { name: task }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg mx-auto bg-white p-4 shadow-md rounded">
        <h1 className="text-xl font-bold mb-4">Task Manager</h1>
        <input type="text" placeholder="New Task" className="w-full p-2 border mb-2" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={addTask} className="w-full p-2 bg-blue-500 text-white rounded">Add Task</button>

        <ul className="mt-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between p-2 border-b">
              <span>{task.name}</span>
              <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
