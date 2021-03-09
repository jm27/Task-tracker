import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import About from "./Components/About";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [task, setTask] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTask(tasksFromServer);
    };

    getTasks();
  }, []);
  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };
  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Delete Task
  const deleteTask = async (id) => {
    // console.log("delete", id);
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTask(task.filter((task) => task.id !== id));
  };
  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = await { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTask(
      task.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  // Add Task
  const addTask = async (nTask) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nTask),
    });
    const data = await res.json();

    setTask([...task, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...nTask };
    // console.log(newTask);
    // setTask([...task, newTask]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}{" "}
              {task.length > 0 ? (
                <Tasks
                  tasks={task}
                  onToggle={toggleReminder}
                  onDelete={deleteTask}
                />
              ) : (
                "No tasks to Show"
              )}
            </>
          )}
        ></Route>
        <Route path="/about" component={About}></Route>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
