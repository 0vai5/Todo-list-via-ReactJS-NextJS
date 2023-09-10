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

    if (title.trim() === "" && desc.trim() === "") {
      // Both title and desc fields are empty, do nothing or display an alert
      // For example, you can display an alert:
      alert("Please enter a title or description for the task.");
    } else {
      // At least one of the fields has a value, so add the task
      setMainTask([...mainTask, { title, desc }]);
      setTitle("");
      setDesc("");
    }
  };

  const deleteHandler = (i) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  let renderTask = (
    <h2 className="text-2xl font-semibold text-center">No Task Available</h2>
  );
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <>
        <li key={i} className="mb-5 flex flex-col justify-center items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-5xl text-center">{t.title}</h1>
            <p className="text-2xl text-center">{t.desc}</p>
          </div>
          <div className="flex flex-col justify-start">
            <button
              onClick={() => {
                deleteHandler(i);
              }}
              className="px-5 py-3 bg-red-400 hover:bg-gray-800 rounded shadow my-2 text-white text-lg font-semibold w-24"
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
    <section className="flex flex-col justify-center items-center">
      <h1 className="bg-black text-5xl text-white text-center p-5 font-extrabold w-full">
        ToDo List
      </h1>
      <form onSubmit={submitHandler} className="w-full flex justify-center items-center flex-col">
        <input
          type="text"
          className="m-10 px-5 py-4 text-2xl  border-solid border-4 border-zinc-950 w-80"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="m-10 px-5 py-4 text-2xl  border-solid border-4 border-zinc-950 leading-7 w-80"
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
      </section>

      <hr className="border-zinc-900 border-5" />
     <div className="p-10">{renderTask}</div>
        
      
    </>
  );
};

export default Page;
