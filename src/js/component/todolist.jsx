import React, { useState } from "react";

const Tasks = ()=>{
    const[tasks, setTasks]= useState([]);
    const[add, setAdd]= useState('');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
        window.onload = function createUser (e) {
          e.preventDefault();
          console.log('crear usuario')
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( [] )
        };
          fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
          .then( (response) => response.json() )
          .then( (data) => console.log(data) )
        }

        function getTask () {
          console.log('leer tareas')
          fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror')
          .then( (response) => response.json() )
          .then( (data) => console.log(data) )
        }
  
        function addTask (e) {
            e.preventDefault();  
            // setAdd('');
            console.log(add)
            console.log(tasks)

            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(
                [
        
                  { tasks }
                  
                ]
              )
          }
            
            console.log('Agregar tarea')
            fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
            .then( (response) => response.json() )
            .then( (data) => console.log(data) )

            
          }

        const deleteTask = (index) => {     

            const newList = [...tasks];
            newList.splice(index,1);
            setTasks(newList);
            

            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(
                
                 newList
                
              )
            };
            
            fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
            .then( (response) => response.json() )
            .then( (data) => console.log(data) )
          
        }

        const deleteAll = () => {
      
          const newList = [];
          setTasks(newList);
        
          const requestOptions = {
            method: 'DELETE',
            };
          
          fetch('https://playground.4geeks.com/apis/fake/todos/user/javierromeror', requestOptions)
          .then( (response) => response.json() )
          .then( (data) => console.log(data) )
        
      }

        return (

            <>
            <div className="container">
              <h1>To do list</h1>
                <div>
                  <form onSubmit={addTask}>
                    <input placeholder="Escribe la tarea" value={add} onChange={(e) => {setAdd(e.target.value)}}/>
                    <button onClick={() => {setTasks([...tasks, add])}}>Agregar tarea</button>

                  </form>
                  <ul>
                    {tasks.map((item,id) => 
                    <li className="list-item" key={id} onMouseEnter={() => setHoveredIndex(id)} onMouseLeave={() => setHoveredIndex(null)}>
                            {item}
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