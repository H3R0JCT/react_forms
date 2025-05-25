// Props for the TaskButton component
type TaskButtonProps = {
  tasks: { id: string, name: string, complete?: boolean }; // Task object with id, name, and optional complete status
  onSelect: (id: string) => void; // Function to handle task selection
  fullWidth?: boolean; // Optional prop to make the button full width
};

// TaskButton component displays a button for a single task
export default function TaskButton({ tasks, onSelect, fullWidth }: TaskButtonProps) {
  // Handles the button click event and calls onSelect with the task's id
  const handleButtonClick = () => {
    onSelect(tasks.id);
  };

  // Use green if complete, otherwise blue
  const buttonClass = tasks.complete
    ? `btn btn-success${fullWidth ? " w-100" : ""} text-wrap`
    : `btn btn-primary${fullWidth ? " w-100" : ""} text-wrap`;

  return (
    // Container for the task button
    <div className="task-button">
      {/* Button displays the task name and triggers selection on click.
          The text-wrap class ensures long text wraps to a new line. */}
      <button
        className={buttonClass}
        style={{ whiteSpace: "normal" }}
        onClick={handleButtonClick}
      >
        {tasks.name}
      </button>
    </div>
  );
}

