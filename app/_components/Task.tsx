// app/_components/Task.tsx
"use client";

import React from "react";
import styles from "../styles/Home.module.css";

export interface TaskData {
  id: number;
  title: string;
  description: string;
  dueDateTime: Date;
}

interface TaskProps {
  task: TaskData;
  removeTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, removeTask }) => {
  return (
    <div className={styles.task}>
      <h2 className={styles.taskTitle}>{task.title}</h2>
      <p className={styles.taskDescription}>{task.description}</p>
      <p className={styles.taskDue}>
        Due Date: {task.dueDateTime instanceof Date ? task.dueDateTime.toLocaleString() : String(task.dueDateTime)}
      </p>
      <button className={styles.button} onClick={() => removeTask(task.id)}>
        Remove
      </button>
    </div>
  );
};

export default Task;
