"use client"
import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';

interface Task {
  id: string;
  title: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[],
  onTaskDrop: (taskId: string, sourceColumnTitle: string, targetColumnTitle: string)=>void,
  onDeleteTask: (taskId: string) => void,
  setColumns: React.Dispatch<React.SetStateAction<{title: string;tasks: Task[];}[]>>
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onTaskDrop, onDeleteTask, setColumns }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== '') {
      const newTask: Task = {
        id: String(Date.now()),
        title: taskTitle
      };
      setTaskTitle('');
      const updatedTasks = [...tasks, newTask];
      const updatedColumns = setColumns((columns) =>
        columns.map((column) => {
          if (column.title === title) {
            return { ...column, tasks: updatedTasks };
          }
          return column;
        })
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const updatedColumns = setColumns((columns) =>
      columns.map((column) => {
        if (column.title === title) {
          return { ...column, tasks: updatedTasks };
        }
        return column;
      })
    );
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumnTitle', title);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const droppedTaskId = e.dataTransfer.getData('taskId');
    const sourceColumnTitle = e.dataTransfer.getData('sourceColumnTitle');
    onTaskDrop(droppedTaskId, sourceColumnTitle, title);
  };

  return (
    <div className="flex flex-col justify-center items-center w-1/3 p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="w-full bg-white rounded shadow-md">
        <div className="p-4">
          <form onSubmit={handleFormSubmit}>
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={handleInputChange}
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 flex-grow p-2 rounded-md"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border-b"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <span className="text-gray-700">{task.title}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteTask(task.id)}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Column;
