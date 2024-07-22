import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
// import { User } from './components/User';
import { Task } from './components/Task';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react';

function App() {

  const[todoList, setTodoList] = useState([]);
  const[newTask, setNewTask]   = useState("");
  const[quote, setQuote]       = useState("");

  const dailyQuote = () => {
      Axios.get(`https://excuser-three.vercel.app/v1/excuse/`)
      .then((res)=>setQuote(res.data[0].excuse));
  }

  useEffect(()=>{
    dailyQuote();
  },[]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    
    if (newTask === null || newTask === undefined || newTask.trim() === '') {
      alert("Enter some text");
      return; // Exit the function if the input is invalid
    }

    // Check if the task already exists in todoList
    const taskExists = todoList.some(task => task.taskName === newTask);
    if (taskExists) {
      alert("The task already exists");
      return; // Exit the function if the task already exists
    }

    const task = {
      id : todoList.length === 0 ? 1 : todoList[todoList.length-1].id+1,
      taskName : newTask,
    }
    setTodoList([...todoList, task]);
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task)=>id===task.id?false:true))
  };

  const toggleDone = (id) => {
    setTodoList(todoList.map((task) => (id === task.id ? { ...task, completed: !task.completed} : task)));
  };

  const editTask = (id) => {
    const editedTask = prompt("Edit")
    if (editedTask === null || editedTask === undefined || editedTask.trim() === '') {
      alert("You cannot submit an empty Task");
      return; // Exit the function if the input is invalid
    }
    else{
      setTodoList(todoList.map((task) => (id === task.id ? {...task, taskName: editedTask} : task)));
    }
  };

  // const editTask = (id) => {
  //   const editedTaskName = prompt("Edit");
  //   if (editedTaskName !== null && editedTaskName.trim() !== "") {
  //     setTodoList(todoList.map((task) => 
  //       id === task.id ? { ...task, taskName: editedTaskName } : task
  //     ));
  //   }
  // };
  
  // const users = [
  //   {name: "Ubaid", age: 21, position: "Frontend Intern", company: "Advergic", isDeveloper: true},
  //   {name: "Hamza", age: 21, position: "Flutter Intern",  company: "Digitalux", isDeveloper: true},
  //   {name: "Usama", age: 21, position: "Network Control Intern", company: "Fauji Fertilizers", isDeveloper: false}
  // ];

  // const [hours, setHours] = useState(0);

  // const handleIncrement = () => {
  //   setHours(hours + 1);
  // };

  // const handleDecrement = () => {
  //   setHours(hours - 1);
  // };

  // const handleReset = () => {
  //   setHours(0);
  // };

  // const Task = (props) => {
  //   return (
  //     <table>
  //           <tr>
  //             <th>Task</th>
  //             <td></td>
  //           </tr>
  //         </table>
  //   );
  // };

  return (
    <div className="App">
        
        {/*Adding tasks*/}
        <div className="addTask">
          <input className="inputTask" type="text" onChange={handleInputChange}/>
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="list">
              <table>
                <tr>
                  <th>Task</th>
                </tr>
                {todoList.map((task) => {
                  return (
                    <Task
                      taskName={task.taskName}
                      id={task.id}
                      deleteTask={deleteTask}
                      toggleDone={toggleDone}
                      completed={task.completed}
                      editTask={editTask}
                    />
                  );
                })}
              </table>
              <div className="excuse">
                <button onClick={dailyQuote}>Excuse from Tasks :D</button>
                <p>{quote}</p>
              </div>
        </div>
        {/* {users.map((user, key) => {
          return(
            <div>
              {user.isDeveloper && <User name={user.name} age={user.age} position={user.position} company={user.company}/>}
            </div>
          );
        })}
        <h3>Working hours since morning: {hours}</h3>
        <button onClick={handleIncrement}> + </button>
        &nbsp;
        <button onClick={handleDecrement}> - </button>
        &nbsp;
        <button onClick={handleReset}> Reset </button> */}


    </div>
  );
}

// const User = (props) => {
//   return (
//     <div>
//       <h1>{props.name}</h1>
//       <h1>{props.age}</h1>
//     </div>
//   )
// }

// const Job = (props) => {
//   return(
//     <div>
//       <h2>Position: {props.position}</h2>
//       <h2>Salary: {props.salary}</h2>
//       <h2>Company: {props.company}</h2>
//     </div>
//   )
// }

export default App;
