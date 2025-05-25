import TaskButton from "./task";

// Props for the Sidebar component
type SidebarProps = {
  onSelect: (name: string) => void; // Function to handle task selection
  tasks: { id: string; name: string }[]; // Array of task objects to display
};

// Sidebar component displays a list of tasks as buttons
export default function Sidebar({ onSelect, tasks }: SidebarProps) {
  return (
    // Sidebar container with border and background styling
    <div className="h-100 d-flex border-end border-2 border-dark p-1 bg-secondary bg-gradient">
      {/* Column container for the task list */}
      <div className="col-12">
        {/* Unordered list with no bullets or padding */}
        <ul style={{ listStyle: 'none', padding: 2, margin: 0 }}>
          {/* Map over tasks and render a TaskButton for each */}
          {tasks.map(task => (
            // List item for each task with margin
            <li key={task.id} className="mb-2">
              {/* TaskButton displays the task and handles selection */}
              <TaskButton tasks={task} onSelect={onSelect} fullWidth />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

