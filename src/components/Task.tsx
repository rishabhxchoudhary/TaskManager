import React from 'react';

interface TaskProps {
  title: string;
}

const Task: React.FC<TaskProps> = ({ title }) => {
  return (
    <div className="flex items-center p-4 border-b">
      <span className="text-gray-700">{title}</span>
    </div>
  );
};

export default Task;
