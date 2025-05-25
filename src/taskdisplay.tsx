// Props for the TaskView component
type TaskViewProps = {
  task: { 
    id: string; 
    name: string; 
    description?: string; 
    complete: boolean 
  } | null; // The selected task or null if none is selected
};

// TaskView component displays details about the selected task
export default function TaskView({ task }: TaskViewProps) {
  return (
    // Main container that allows the view to grow and fill available space
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      {/* Center text inside the inner container */}
      <div className="text-center">
        {/* Heading for the task view section */}
        <h2 className="p-3">Task View</h2>
        {/* Display the selected task's name or a placeholder if none is selected */}
        <p>
          {task ? `${task.name}` : "This is where the task details will be displayed."}
        </p>
        {/* Display the selected task's completion status or a placeholder if none is selected */}
        <p>
          {task ? `Task Complete: ${task.complete}` : "This is where the task status will be displayed."}
        </p>
        {/* Show the task description if available, or a placeholder if not */}
        <p>
          {task && task.description
            ? `Description: ${task.description}`
            : "This is where the task description will be displayed."}
        </p>
      </div>
    </div>
  );
}
