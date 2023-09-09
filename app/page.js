"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setMainTask(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  let renderTask = (
    <h2 className="text-2xl font-semibold">No Task Available</h2>
  );
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <>
      <li key={i} className="mb-5 flex justify-between w-full">
        <div className="flex flex-col">
          <h1 className="font-bold text-5xl">{t.title}</h1>
          <p className="text-2xl">{t.desc}</p>
        </div>
        <div className="flex flex-col justify-start">
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="px-5 py-3 bg-red-400 hover:bg-gray-800 rounded shadow my-2 text-white text-lg font-semibold"
          >
            Delete
          </button>
        </div>
      </li>
      <hr className="border-zinc-900 border-2" />
      </>
    ));
    
  }
  

  return (
    <>
    
      <h1 className="bg-black text-5xl text-white text-center p-5 font-extrabold">
        ToDo List
      </h1>
      <form onSubmit={submitHandler} className="w-full">
        <input
          type="text"
          className="m-10 px-5 py-4 text-2xl  border-solid border-4 border-zinc-950"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="m-10 px-5 py-4 text-2xl  border-solid border-4 border-zinc-950"
          placeholder="Enter Description here"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button className="px-10 py-6 bg-black hover:bg-zinc-400 rounded shadow my-8 text-white text-2xl font-bold m-10">
          Add Task
        </button>
      </form>

      <hr className="border-zinc-900 border-5" />
      <div className="p-10">{renderTask}</div>
    </>
  );
};

export default Page;
