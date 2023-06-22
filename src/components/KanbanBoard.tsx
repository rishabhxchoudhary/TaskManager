"use client"
import React, { useState } from 'react';
import Column from './Column';

interface Task {
  id: string;
  title: string;
}

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<{ title: string; tasks: Task[] }[]>([
    { title: 'To Do', tasks: [] },
    { title: 'In Progress', tasks: [] },
    { title: 'Done', tasks: [] }
  ]);

  const handleTaskDrop = (taskId: string, sourceColumnTitle: string, targetColumnTitle: string) => {
    if (sourceColumnTitle === targetColumnTitle) return;

    const updatedColumns = columns.map((column) => {
      if (column.title === sourceColumnTitle) {
        const tasks = column.tasks.filter((task) => task.id !== taskId);
        return { ...column, tasks };
      } else if (column.title === targetColumnTitle) {
        const task: Task | undefined = columns.find((col) => col.title === sourceColumnTitle)?.tasks.find(
          (task) => task.id === taskId
        );
        if (task) {
          const tasks = [...column.tasks, task];
          return { ...column, tasks };
        }
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedColumns = columns.map((column) => {
      const tasks = column.tasks.filter((task) => task.id !== taskId);
      return { ...column, tasks };
    });

    setColumns(updatedColumns);
  };

  return (
    <div className="flex justify-center space-x-4 p-4">
      {columns.map((column) => (
        <Column
          key={column.title}
          title={column.title}
          tasks={column.tasks}
          onTaskDrop={handleTaskDrop}
          onDeleteTask={handleDeleteTask}
          setColumns = {setColumns}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
