import React, { useState } from "react";

const Tasks = ()=>{
    const[tasks, setTasks]= useState([]);
    const[add, setAdd]= useState('');
    const [hoveredIndex, setHoveredIndex] = useState(null);

        function readTasks () {
            fetch("https://playground.4geeks.com/apis/fake/todos/user/jaromeroibz")
            .then( (response) => response.json() )
            .then( (data) => console.log(data))
        };

        function createUser () {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([])
            };

            fetch('https://playground.4geeks.com/apis/fake/todos/user/jaromeroibz', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));

        };

        function addTask (e) {
            e.preventDefault();
            console.log("Prueba")
            setTasks([...tasks, add])
            setAdd('');
            

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([tasks])
            };

            fetch('https://playground.4geeks.com/apis/fake/todos/user/jaromeroibz', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));

            console.log(tasks)
        };

        const deleteTask = (index) => {
            const newList = [...tasks];
            newList.splice(index,1);
            setTasks(newList);

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([newList])
            };

            fetch('https://playground.4geeks.com/apis/fake/todos/user/jaromeroibz', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
            
            console.log(tasks)

          };


        return (

            <>
            <div className="container">
              <h1>To do list</h1>
                <div>
                  <form onSubmit={addTask}>
                    <input placeholder="Escribe la tarea" value={add} onChange={(e) => {setAdd(e.target.value);}}/>
                  </form>
                  <ul>
                    {tasks.map((item,id) => 
                    <li className="list-item" key={id} onMouseEnter={() => setHoveredIndex(id)} onMouseLeave={() => setHoveredIndex(null)}
    >
                            {item}
                            {hoveredIndex === id && (
                            <button onClick={() => deleteTask(id)}>x</button>
                            )}

                    </li>
                    )}
                  </ul>
                </div>
           </div>
          </>   
        );
};

export default Tasks;