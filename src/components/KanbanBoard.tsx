import React, { useEffect, useState } from 'react';
import Column from './Column';
import { useSession } from 'next-auth/react';

interface Task {
  id: string;
  title: string;
}

const KanbanBoard: React.FC = () => {
  const {data: session} = useSession({required: true});
  const [columns, setColumns] = useState<{ title: string; tasks: Task[] }[]>([
  ]);
  
  useEffect(() => {
    const getData = async () => {
      const data = fetch('/api/getdata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await data;
      const json = await res.json();
      setColumns(json.data);
    };
    getData();
  }, [session]);

  useEffect(() => {
    if (columns.length === 0) return;
    const updatedColumns =  async () => {
      fetch('/api/updatedata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: columns})
      })
    }
    updatedColumns();
  }, [columns]);

  const handleTaskDrop = (
    taskId: string,
    sourceColumnTitle: string,
    targetColumnTitle: string
  ) => {
    if (sourceColumnTitle === targetColumnTitle) return;

    const updatedColumns = columns.map((column) => {
      if (column.title === sourceColumnTitle) {
        const tasks = column.tasks.filter((task) => task.id !== taskId);
        return { ...column, tasks };
      } else if (column.title === targetColumnTitle) {
        const task: Task | undefined = columns
          .find((col) => col.title === sourceColumnTitle)
          ?.tasks.find((task) => task.id === taskId);
        if (task) {
          const tasks = [...column.tasks, task];
          return { ...column, tasks };
        }
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  return (
    <div className="flex flex-col justify-center md:flex-row">
      {columns.map((column) => (
        <Column
          key={column.title}
          title={column.title}
          tasks={column.tasks}
          onTaskDrop={handleTaskDrop}
          setColumns={setColumns}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
