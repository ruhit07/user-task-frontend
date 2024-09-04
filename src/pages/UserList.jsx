import { useState } from 'react';
import { sortedUser } from '../services/user';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userIdCounter, setUserIdCounter] = useState(1);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  const handleUserChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index] = { ...newUsers[index], [field]: value };
    setUsers(newUsers);
  };

  const handleTaskChange = (userIndex, taskIndex, field, value) => {
    const newUsers = [...users];
    const tasks = [...newUsers[userIndex].tasks];
    tasks[taskIndex] = { ...tasks[taskIndex], [field]: value };
    newUsers[userIndex] = { ...newUsers[userIndex], tasks };
    setUsers(newUsers);
  };

  const addUser = () => {
    setUsers([...users, { id: userIdCounter, name: '', email: '', tasks: [] }]);
    setUserIdCounter(userIdCounter + 1);
    setError(null)
  };

  const removeUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setSortedUsers([])
    setError(null)
  };

  const handleClear = () => {
    setUsers([]);
    setError(null)
    setSortedUsers([])
    setUserIdCounter(1);
    setTaskIdCounter(1);
  };

  const addTask = (idx) => {
    const newUsers = [...users];
    const tasks = [...newUsers[idx].tasks, { id: taskIdCounter, description: '', status: 'incomplete' }];
    newUsers[idx] = { ...newUsers[idx], tasks };
    setUsers(newUsers);
    setTaskIdCounter(taskIdCounter + 1);
    setError(null)
  };

  const removeTask = (userIdx, taskId) => {
    const newUsers = [...users];
    const tasks = newUsers[userIdx].tasks.filter(task => task.id !== taskId);
    newUsers[userIdx] = { ...newUsers[userIdx], tasks };
    setUsers(newUsers);
    setSortedUsers([])
    setError(null)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ "users": users });

    try {
      const response = await sortedUser({ "users": users });
      setSortedUsers(response.data?.sortedUsers || []);
      setError(null);
    } catch (err) {
      setError(err.response.data?.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Task Form</h1>
      <form onSubmit={handleSubmit}>
        {users.map((user, userIndex) => (
          <User
            key={user.id}
            user={user}
            userIndex={userIndex}
            handleUserChange={handleUserChange}
            removeUser={removeUser}
            handleTaskChange={handleTaskChange}
            addTask={addTask}
            removeTask={removeTask}
          />
        ))}
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={addUser}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add User
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-700 text-white p-2 rounded"
          >
            Clear
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <ul className="mt-4 space-y-2 bg-gray-100 p-4 rounded-lg shadow-lg">
          {sortedUsers.length ? sortedUsers.map(user => (
            <li key={user.id} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-center">
              <span className="font-semibold text-gray-700">{user.name}</span>
              <span className="text-sm text-gray-500">{user.completedTasks} completed tasks</span>
            </li>
          )) : <span>Sorted Users List</span>}
        </ul>


      </form>
    </div>
  );
};

export default UserList;
