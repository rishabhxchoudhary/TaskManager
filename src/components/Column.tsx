import React, { useState } from 'react';
import { TrashIcon, PlusIcon } from '@heroicons/react/solid';

interface Task {
  id: string;
  title: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  onTaskDrop: (taskId: string, sourceColumnTitle: string, targetColumnTitle: string) => void;
  setColumns: React.Dispatch<React.SetStateAction<{ title: string; tasks: Task[] }[]>>;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onTaskDrop, setColumns }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [dragEnterIndex, setDragEnterIndex] = useState<number | null>(null);

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
      setColumns((columns) =>
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
    setColumns((columns) =>
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
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-gray-400', 'border-2', 'border-dashed');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-gray-400', 'border-2', 'border-dashed');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-gray-400', 'border-2', 'border-dashed');
    const droppedTaskId = e.dataTransfer.getData('taskId');
    const sourceColumnTitle = e.dataTransfer.getData('sourceColumnTitle');
  
    if (dragEnterIndex !== null && sourceColumnTitle === title) {
      const updatedTasks = [...tasks];
      const droppedTask = updatedTasks.find((task) => task.id === droppedTaskId);
  
      if (droppedTask) {
        const sourceIndex = updatedTasks.findIndex((task) => task.id === droppedTaskId);
        updatedTasks.splice(sourceIndex, 1);
        updatedTasks.splice(dragEnterIndex, 0, droppedTask);
  
        setColumns((columns) =>
          columns.map((column) => {
            if (column.title === title) {
              return { ...column, tasks: updatedTasks };
            }
            return column;
          })
        );
      }
    } else if (sourceColumnTitle !== title) {
      const targetColumnTitle = title;
      onTaskDrop(droppedTaskId, sourceColumnTitle, targetColumnTitle);
    }
  
    setDragEnterIndex(null);
  };  

  const handleDragEnterObject = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragEnterIndex(index);
  }

  const handleDragLeaveObject = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }
  return (
    <div
      className="flex flex-col justify-start items-center md:w-1/3 p-4 "
      onDragEnter={(e) => handleDragEnter(e, tasks.length-1)}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
                className="border-gray-300 text-gray-700  focus:ring-0 focus:ring-transparent
                 flex-grow p-2 rounded-md"
              />
            <button type="submit" className="ml-2 p-2 bg-blue-500 rounded-full">
                <PlusIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </form>
        </div>
        <div>
          {tasks?.map((task, index) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 border-b ${
                dragEnterIndex === index ? 'bg-blue-200' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragEnter={(e) => handleDragEnterObject(e, index)}
              onDragLeave={(e)=> handleDragLeaveObject(e)}
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
