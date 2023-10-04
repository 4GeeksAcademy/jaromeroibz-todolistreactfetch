import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState({label: '', done: false});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function createUser(e) {
    console.log('crear usuario')
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([])
    };
    fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
      .then((response) => response.json())
      .then((data) => getTask())
  }

  async function getTask() {
    console.log('leer tareas')
    let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror')

    let data = await response.json()
    if (response.ok){
      setTasks(data)
    }
    if (response.status == 404) {

      createUser()

    }
  
  }

  useEffect(() => { getTask() }, [])

  function addTask(e) {
    // setAdd('');
    console.log(add)
    console.log(tasks)

    // let newArray = tasks.concat(obj);
    // setTasks(newArray)

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        [

          ...tasks,add

        ]
      )
    }

    console.log('Agregar tarea')
    console.log(tasks)

    fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
      .then((response) => response.json())
      .then((data) => getTask())


  }

  const deleteTask = (index) => {

    const newList = [...tasks];
    newList.splice(index, 1);
    setTasks(newList);


    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(

        newList

      )
    };

    fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))

  }

  const deleteAll = () => {

    const newList = [];
    setTasks(newList);

    const requestOptions = {
      method: 'DELETE',
    };

    fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))

  }

  return (

    <>
      <div className="container">
        <h1>To do list</h1>
        <div>
          <form>
            <input placeholder="Escribe la tarea" value={add.label} onChange={(e) => { setAdd({label: e.target.value, done: false}) }} />
            <button type='button' onClick={() => {addTask()}}>Agregar tarea</button>

          </form>
          <ul>
            {tasks.map((item, id) =>
              <li className="list-item" key={id} onMouseEnter={() => setHoveredIndex(id)} onMouseLeave={() => setHoveredIndex(null)}>
                {item.label}
                {hoveredIndex === id && (
                  <button onClick={() => deleteTask(id)}>x</button>
                )}

              </li>
            )}
          </ul>
          <button onClick={deleteAll}>Delete all tasks and user</button>
        </div>
      </div>
    </>
  );
};


export default Tasks;