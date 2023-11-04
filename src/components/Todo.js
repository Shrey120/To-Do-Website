import React, { useEffect, useState } from "react";
import "./style.css";
import { VscCheck, VscClose } from "react-icons/vsc";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const getData = () => {
  return JSON.parse(localStorage.getItem("ToDoList"));
};

export default function Todo() {
  const [name, setname] = useState("");

  const [category, setcategory] = useState("");
  const [task, settask] = useState(getData);
  const [toggle, settoggle] = useState(false);
  const [edited, setedited] = useState("");

  const sumbithandler = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please Enter Some Task");
    } else if (toggle) {
      settask(
        task.map((ele) => {
          if (ele.id === edited) {
            return {
              ...ele,
              name: name,
            };
          }
          return ele;
        })
      );
      setname("");
      setedited(null);
      settoggle(false);
    } else {
      settask([
        ...task,
        {
          id: new Date().getTime().toString(),
          name: name,
          category: category,
        },
      ]);
    }
    setname("");
  };
  const catchange = (ele) => {
    setcategory(ele);
  };

  const changeHandler = (input) => {
    setname(input);
  };

  const completetask = (ele) => {
    settask(task.filter((curr) => curr.id !== ele.id));
  };

  const edittask = (ele) => {
    const a = task.find((curr) => {
      return curr.id === ele.id;
    });
    setname(a.name);
    setedited(ele.id);
    settoggle(true);
  };

  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(task));
  }, [task]);
  return (
    <>
      <div className="page">
        <div className="heading">To Do App</div>
        <div className="top-container">
          <form className="search-bar">
            <input
              type="text"
              value={name}
              onChange={(e) => changeHandler(e.target.value)}
              placeholder="Enter your task"
              className="input-task"
            />
            <select
              className="drop-down-list"
              onChange={(e) => catchange(e.target.value)}>
              <option> </option>
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="not urgent">Not Urgent</option>
              <option value="not important">Not Important</option>
            </select>
            {toggle ? (
              <button
                onClick={sumbithandler}
                className="btn-mark edit">
                <BiSolidEditAlt />
              </button>
            ) : (
              <button
                onClick={sumbithandler}
                className="submit">
                <AiOutlinePlus />
              </button>
            )}
          </form>
        </div>
        <nav className="navbar">
          <div className="btn-grp">
            <div className="btn">All</div>
            <div className="btn">Urgent</div>
            <div className="btn">Important</div>
            <div className="btn">Not Urgent</div>
            <div className="btn">Not Important</div>
          </div>
        </nav>
        {task.map((ele, index) => {
          return (
            <div
              className="tasks"
              key={ele.id}>
              <div className="task">{ele.name}</div>
              <div className="btns">
                <button className="btn-mark tick">
                  <VscCheck />
                </button>
                <button
                  className="btn-mark edit"
                  onClick={() => edittask(ele)}>
                  <BiSolidEditAlt />
                </button>
                <button
                  className="btn-mark cross"
                  onClick={() => completetask(ele)}>
                  <VscClose />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
