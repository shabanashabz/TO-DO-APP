import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    const task = inputValue;

    if (!task) {
      toast.warning("Please ADD any valid task!", {
        autoClose: 3000,
      });
      return;
    }

    if (editingIndex !== null) {
      // If editing, update the existing task
      const updatedTodo = [...todo];
      updatedTodo[editingIndex].task = task;
      updatedTodo[editingIndex].dueDate = dueDate; // Update due date
      setTodo(updatedTodo);
      setEditingIndex(null); // Reset editing index after saving changes
      toast.success("Task UPDATED successfully!", {
        autoClose: 3000,
      });
    } else {
      // If not editing, add a new task with the due date
      setTodo([...todo, { task: task, completed: false, dueDate: dueDate }]);

      // Show a success toast when a new task is added
      toast.success("Task added successfully!", {
        autoClose: 3000,
      });
    }

    setInputValue(""); // Clear the input field after adding/updating
    setDueDate(""); // Clear the date input after adding/updating
    e.target.reset();
  }

  function changeStatus(index) {
    const newTodo = [...todo];
    newTodo[index].completed = !newTodo[index].completed;
    setTodo(newTodo);
  }

  function deleteTask(index) {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  }

  function editTask(index) {
    setEditingIndex(index); // Set the task to be edited
    setInputValue(todo[index].task); // Set the input value to the task's text
    setDueDate(todo[index].dueDate); // Set the date input value to the task's due date
  }

  // Function to filter tasks based on the current filter
  const filteredTodo = todo.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // Default: show all tasks
  });

  return (
    <>
      <div className="container my-5">
        <div
          className="mx-auto rounded border p-4 w-50"
          style={{
            backgroundColor: "lightblue", // Dark theme background
            borderColor: "#4b4b6e", // Border color
          }}
        >
          <h2 className="text-dark text-center mb-5">MY TO DO LIST</h2>

          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <div className="d-flex mb-2">
              <input
                className="form-control me-2"
                placeholder="Add your tasks here"
                name="task"
                value={inputValue} // Controlled input for editing
                onChange={(e) => setInputValue(e.target.value)} // Update input value
                style={{
                  backgroundColor: "white", // Input field background
                  color: "#000000", // Text color
                  borderColor: "#6e6e91", // Border color
                }}
              />
              <input
                type="date"
                className="form-control"
                value={dueDate} // Controlled date input
                onChange={(e) => setDueDate(e.target.value)} // Update due date value
                style={{
                  backgroundColor: "white", // Date input background
                  color: "#000000", // Text color
                  borderColor: "#6e6e91", // Border color
                }}
              />
            </div>
            <button
              className="btn btn-primary text-light"
              type="submit"
              // style={{
              //   backgroundColor: "#ffce00", // Button background
              //   borderColor: "#ffce00", // Border color
              //   color: "#000000", // Text color
              // }}
            >
              {editingIndex !== null ? "UPDATE" : "ADD"}{" "}
              {/* Update button text when editing */}
            </button>
          </form>

          <div className="my-3 d-flex justify-content-between">
            {/* Buttons to filter tasks */}
            <button
              className={`btn btn-${
                filter === "all" ? "warning" : "secondary"
              }`}
              onClick={() => setFilter("all")}
            >
              All Tasks
            </button>
            <button
              className={`btn btn-${
                filter === "completed" ? "warning" : "secondary"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed Tasks
            </button>
            <button
              className={`btn btn-${
                filter === "pending" ? "warning" : "secondary"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending Tasks
            </button>
          </div>

          {filteredTodo.length > 0 ? (
            filteredTodo.map((todos, index) => {
              return (
                <div
                  key={index}
                  className="rounded mt-4 p-2 d-flex justify-content-between"
                  style={{
                    backgroundColor: todos.completed
                      ? "#28a745"
                      : "lightgoldenrodyellow", // Green for completed, orange for pending
                    color: todos.completed ? "#ffffff" : "black", // White text for task
                  }}
                >
                  <div>
                    <div>{todos.task}</div>
                    {todos.completed ? (
                      "task completed !!!!!!"
                    ) : (
                      <small>Due: {todos.dueDate || "No date set"}</small>
                    )}
                  </div>
                  <div>
                    <i
                      className={
                        "h5 me-2 " +
                        (todos.completed
                          ? "bi bi-check-square text-dark"
                          : "bi bi-square text-success")
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => changeStatus(index)}
                    ></i>
                    <i
                      className="bi bi-pencil-square me-1 ms-2 h5 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => editTask(index)} // Edit task button
                    ></i>
                    <i
                      className="bi bi-trash me-1 ms-2 h5 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteTask(index)}
                    ></i>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-danger mt-4 text-center">No tasks to display.</p>
          )}
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer />
    </>
  );
}

export default TodoList;
