import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { testTasks as initialTasks } from "./data";
import Sidebar from "./sidebar";
import Toolbar from "./toolbar";
import TaskView from "./taskdisplay";
import TaskModal from "./modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  // State for the list of tasks
  const [tasks, setTasks] = useState(initialTasks);
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  // State for the text displayed in the modal
  const [modalText, setModalText] = useState("Add Task");
  // State for the currently selected task's id
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  // State for the new or edited task's title
  const [newTaskTitle, setNewTaskTitle] = useState("");
  // State for the new or edited task's description
  const [newTaskDescription, setNewTaskDescription] = useState("");
  // State to determine if the modal is in add mode
  const [isAddMode, setIsAddMode] = useState(false);
  // State to determine if the modal is in edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Handles toolbar actions: add, edit, delete, or complete a task
  const handleTask = (text: string) => {
    if (text === "Add") {
      // Open modal in add mode
      setModalText("Add Task");
      setIsAddMode(true);
      setIsEditMode(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setShowModal(true);
    } else if (text === "Edit") {
      // Open modal in edit mode with selected task's info
      if (!selectedTask) return;
      const task = tasks.find(t => t.id === selectedTask);
      if (!task) return;
      setModalText("Edit Task");
      setIsAddMode(false);
      setIsEditMode(true);
      setNewTaskTitle(task.name);
      setNewTaskDescription(task.description || "");
      setShowModal(true);
    } else if (text.startsWith("Task deleted successfully!")) {
      // Delete the selected task
      setTasks((prev) => prev.filter(task => task.id !== selectedTask));
      setSelectedTask(null);
      setModalText(text);
      setIsAddMode(false);
      setIsEditMode(false);
      setShowModal(true);
    } else if (text.startsWith("Task marked as complete!")) {
      // Toggle the complete status of the selected task
      setTasks((prev) =>
        prev.map(task =>
          task.id === selectedTask ? { ...task, complete: !task.complete } : task
        )
      );
      setModalText(text);
      setIsAddMode(false);
      setIsEditMode(false);
      setShowModal(true);
    }
  };

  // Handles adding a new task
  const handleAddTask = () => {
    const title = newTaskTitle.trim() || "New Task";
    const description = newTaskDescription.trim();
    const newTask = { id: uuidv4(), name: title, description, complete: false };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setShowModal(false);
    setIsAddMode(false);
    setIsEditMode(false);
    setModalText("Added a new task successfully!");
  };

  // Handles editing an existing task
  const handleEditTask = () => {
    setTasks((prev) =>
      prev.map(task =>
        task.id === selectedTask
          ? { ...task, name: newTaskTitle.trim() || "Untitled Task", description: newTaskDescription }
          : task
      )
    );
    setShowModal(false);
    setIsEditMode(false);
    setIsAddMode(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setModalText("Task updated successfully!");
  };

  // Closes the modal and resets modal-related state
  const handleCloseModal = () => {
    setShowModal(false);
    setIsAddMode(false);
    setIsEditMode(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return (
    // Main app container, full width and height, flex column layout
    <div className="w-100 h-100 min-vh-100 m-0 p-0 d-flex flex-column">
      {/* Toolbar for task actions (add, delete, edit, complete) */}
      <Toolbar
        onTask={handleTask}
        canDelete={!!selectedTask}
      />
      {/* Main content area: sidebar and task view */}
      <div className="flex-grow-1 d-flex w-100 h-100">
        {/* Sidebar with fixed width for task list */}
        <div style={{ width: 250, minWidth: 180, maxWidth: 350 }}>
          <Sidebar onSelect={setSelectedTask} tasks={tasks} />
        </div>
        {/* TaskView displays details of the selected task */}
        <div className="flex-grow-1">
          <TaskView task={tasks.find(task => task.id === selectedTask) || null} />
        </div>
      </div>
      {/* TaskModal displays feedback or prompts for actions */}
      <TaskModal
        show={showModal}
        handleClose={handleCloseModal}
        text={modalText}
        isAddMode={isAddMode}
        isEditMode={isEditMode}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
      />
    </div>
  );
}