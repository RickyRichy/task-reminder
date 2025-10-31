// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import TaskList from "./_components/TaskList";
import styles from "./styles/Home.module.css";
import { TaskData } from "./_components/Task";
import Image from "next/image";

export default function HomePage() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const addTask = () => {
    if (!title || !description || !dueDate || !dueTime) return;

    const dueDateTime = new Date(`${dueDate}T${dueTime}:00`);
    const newTask: TaskData = {
      id: Date.now(),
      title,
      description,
      dueDateTime,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setCompletedTasks((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  };

  useEffect(() => {
    // setTimeout IDs
    const timers: (ReturnType<typeof setTimeout> | null)[] = tasks.map(
      (task) => {
        const timeDiff = task.dueDateTime.getTime() - Date.now();
        if (timeDiff > 60000 && !completedTasks.has(task.id)) {
          // schedule alert 1 minute before due time
          return setTimeout(() => {
            alert(`Reminder: ${task.title} is due in 1 minute.`);
            setCompletedTasks((prev) => new Set(prev).add(task.id));
          }, timeDiff - 60000);
        }
        // if due in less than 1 min, skip scheduling
        return null;
      }
    );

    return () => {
      timers.forEach((t) => {
        if (t) clearTimeout(t);
      });
    };
  }, [tasks, completedTasks]);

  const sorted = [...tasks].sort(
    (a, b) => a.dueDateTime.getTime() - b.dueDateTime.getTime()
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/tasklist.svg"
          // src="https://media.geeksforgeeks.org/wp-content/uploads/20240320180346/gfg(1).png"
          alt="GeeksforGeeks logo"
          className={styles.logo}
          width={50}
          height={50}
        />
        <h1 className={styles.title}>Task Reminder App</h1>
      </div>

      <input
        type="text"
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        className={styles.input}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className={styles.input}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <input
        type="time"
        className={styles.input}
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
      />

      <button className={styles.button} onClick={addTask}>
        Add Task
      </button>

      <TaskList tasks={sorted} removeTask={removeTask} />
    </div>
  );
}
