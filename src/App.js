import { useEffect, useState} from "react";
import './App.css';

function App() {
    const [todos, setTodos] = useState();
    const [todo, setTodo] = useState();

    useEffect(()=>{
        const formData = new FormData();
        formData.append('action', 'todos')

        fetch(`${process.env.REACT_APP_ENDPOINT}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => setTodos(data))
    }, [])

    const addTodo = () => {
        if(!todo){
            alert('todo boş olamaz')
            return
        }
        const formData = new FormData();
        formData.append('todo', todo)
        formData.append('action', 'add-todo')

        fetch(`${process.env.REACT_APP_ENDPOINT}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    console.log(data.error)
                }else{
                    setTodos([data, ...todos])
                    setTodo('')
                }
            })
    }

    const deleteTodo = todoId => {
        const formData = new FormData();
        formData.append('id', todoId)
        formData.append('action', 'delete-todo')

        fetch(`${process.env.REACT_APP_ENDPOINT}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    console.log(data.error)
                }else{
                    setTodos(todos.filter(todo => todo.id !== todoId))
                }
            })
    }

    const doneTodo = todoId => {
        const formData = new FormData();
        formData.append('id', todoId)
        formData.append('action', 'done-todo')

        fetch(`${process.env.REACT_APP_ENDPOINT}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

  return (
    <>
     <h1>Todo Uygulaması</h1>
        <div>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="todo yazın"/>
            <button onClick={addTodo}>EKLE</button>
        </div>

        {todos && (
          <ul className="todos">
              {todos.map(todo => (
                  <li className={todo.done === "1" ? 'done' : ''} key={todo.id}>
                      <span onClick={() => doneTodo(todo.id)}>{todo.todo}</span>
                      <button onClick={() => deleteTodo(todo.id)}>Sil</button>
                  </li>
              ))}
          </ul>
        )}
    </>
  );
}

export default App;
