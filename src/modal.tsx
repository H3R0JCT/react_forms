import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Props for the TaskModal component
type TaskModalProps = {
  show: boolean;
  handleClose: () => void;
  text: string;
  isAddMode?: boolean;
  isEditMode?: boolean;
  newTaskTitle?: string;
  setNewTaskTitle?: (title: string) => void;
  newTaskDescription?: string;
  setNewTaskDescription?: (desc: string) => void;
  handleAddTask?: () => void;
  handleEditTask?: () => void;
};

// Helper function to determine the modal heading based on mode and text
function getModalHeading({
  isAddMode,
  isEditMode,
  text,
}: {
  isAddMode?: boolean;
  isEditMode?: boolean;
  text: string;
}) {
  if (isAddMode) return "Add Task";
  if (isEditMode) return "Edit Task";
  if (text.startsWith("Task deleted")) return "Delete Task";
  if (text.startsWith("Task marked as complete!")) return "Complete Task";
  return "Modal heading";
}

// TaskModal component displays a Bootstrap modal dialog
function TaskModal({
  show,
  handleClose,
  text,
  isAddMode = false,
  isEditMode = false,
  newTaskTitle = "",
  setNewTaskTitle = () => {},
  newTaskDescription = "",
  setNewTaskDescription = () => {},
  handleAddTask = () => {},
  handleEditTask = () => {},
}: TaskModalProps) {
  // Handle Enter key for form submission or closing
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isAddMode && newTaskTitle.trim()) {
        handleAddTask();
      } else if (isEditMode && newTaskTitle.trim()) {
        handleEditTask();
      } else if (!isAddMode && !isEditMode) {
        handleClose();
      }
    }
  };

  return (
    // Modal component from react-bootstrap, controlled by the 'show' prop
    <Modal show={show} onHide={handleClose}>
      {/* Modal header with a close button and dynamic title */}
      <Modal.Header closeButton>
        <Modal.Title>
          {getModalHeading({ isAddMode, isEditMode, text })}
        </Modal.Title>
      </Modal.Header>
      {/* Form to handle Enter key for submission or closing */}
      <form onKeyDown={handleKeyDown}>
        {/* Modal body displays either input fields for add/edit or just text for info */}
        <Modal.Body>
          {(isAddMode || isEditMode) ? (
            <>
              {/* Input field for entering the task title */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                autoFocus
              />
              {/* Textarea for entering the task description */}
              <textarea
                className="form-control"
                placeholder="Enter task description"
                value={newTaskDescription}
                onChange={e => setNewTaskDescription(e.target.value)}
                rows={3}
                style={{ resize: "vertical", marginTop: "0.5rem" }}
              />
            </>
          ) : (
            // Show modal text for delete/complete/info
            text
          )}
        </Modal.Body>
        {/* Modal footer with action buttons */}
        <Modal.Footer>
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Button to add a new task, only shown in add mode */}
          {isAddMode ? (
            <Button variant="primary" onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
              Add
            </Button>
          ) : isEditMode ? (
            // Button to save changes, only shown in edit mode
            <Button variant="primary" onClick={handleEditTask} disabled={!newTaskTitle.trim()}>
              Save
            </Button>
          ) : (
            // OK button for info modals
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default TaskModal;