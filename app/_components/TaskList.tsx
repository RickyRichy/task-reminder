// app/_components/TaskList.tsx
"use client";

import React from "react";
import Task, { TaskData } from "./Task";

interface TaskListProps {
  tasks: TaskData[];
  removeTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, removeTask }) => {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} removeTask={removeTask} />
      ))}
    </div>
  );
};

export default TaskList;
