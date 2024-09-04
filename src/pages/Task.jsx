/* eslint-disable react/prop-types */
const Task = ({ task, taskIndex, userIndex, handleTaskChange, removeTask }) => (
  <div className="mb-2">
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-1xl">Task {taskIndex + 1}</h1>
      <button
        onClick={() => removeTask(userIndex, task.id)}
        className="bg-red-700 text-white p-1 rounded"
        aria-label={`Remove Task ${taskIndex + 1}`}
      >
        Remove Task
      </button>
    </div>
    <input
      type="text"
      required
      value={task.description}
      placeholder="Task Description"
      onChange={(e) => handleTaskChange(userIndex, taskIndex, 'description', e.target.value)}
      className="p-2 border rounded mb-2 w-full"
    />
    <select
      required
      value={task.status}
      onChange={(e) => handleTaskChange(userIndex, taskIndex, 'status', e.target.value)}
      className="p-2 border rounded w-full"
    >
      <option value="complete">Complete</option>
      <option value="incomplete">Incomplete</option>
    </select>
  </div>
);

export default Task;