/* eslint-disable react/prop-types */
import Task from "./Task";

const User = ({ user, userIndex, handleUserChange, removeUser, handleTaskChange, addTask, removeTask }) => (
  <div className="mb-4 p-4 border rounded">
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-2xl">User {userIndex + 1}</h1>
      <button
        onClick={() => removeUser(user.id)}
        className="bg-red-700 text-white p-2 rounded"
        aria-label={`Remove User ${userIndex + 1}`}
      >
        Remove User
      </button>
    </div>

    <input
      type="text"
      required
      value={user.name}
      placeholder="Name"
      onChange={(e) => handleUserChange(userIndex, 'name', e.target.value)}
      className="p-2 border rounded mb-2 w-full"
    />
    <input
      type="email"
      required
      value={user.email}
      placeholder="Email"
      onChange={(e) => handleUserChange(userIndex, 'email', e.target.value)}
      className="p-2 border rounded mb-2 w-full"
    />

    {user.tasks.map((task, taskIndex) => (
      <Task
        key={task.id}
        task={task}
        taskIndex={taskIndex}
        userIndex={userIndex}
        handleTaskChange={handleTaskChange}
        removeTask={removeTask}
      />
    ))}

    <button
      onClick={() => addTask(userIndex)}
      className="bg-gray-600 text-white p-2 rounded"
    >
      Add Task
    </button>
  </div>
);

export default User