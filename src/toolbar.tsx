type ToolbarProps = {
  onTask: (text: string) => void; // Function to handle toolbar actions
  canDelete: boolean; // Determines if the Delete, Edit, and Complete buttons should be enabled
};

// Toolbar component displays action buttons for task management
export default function Toolbar({ onTask, canDelete }: ToolbarProps) {
  return (
    // Toolbar container with alignment, border, padding, and background styling
    <div className="toolbar align-items-center d-flex justify-content-center border-bottom border-2 border-dark p-1 bg-secondary bg-gradient">
      {/* Add Task button: opens the modal to add a new task */}
      <button
        className="btn btn-primary m-3"
        onClick={() => onTask('Add')}
      >
        Add Task
      </button>
      {/* Delete Task button: deletes the selected task, disabled if no task is selected */}
      <button
        className="btn btn-danger m-3"
        onClick={() => onTask('Task deleted successfully!')}
        disabled={!canDelete}
      >
        Delete Task
      </button>
      {/* Edit Task button: opens the modal to edit the selected task, disabled if no task is selected */}
      <button
        className="btn btn-warning m-3"
        onClick={() => onTask('Edit')}
        disabled={!canDelete}
      >
        Edit Task
      </button>
      {/* Complete Task button: toggles the completion status of the selected task, disabled if no task is selected */}
      <button
        className="btn btn-success m-3"
        onClick={() => onTask('Task marked as complete!')}
        disabled={!canDelete}
      >
        Complete Task
      </button>
    </div>
  );
}