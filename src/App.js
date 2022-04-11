import React,{useState,useRef,useEffect} from 'react';
import TodoList from './TodoList';
import Todo from './Todo'
import { v4 as uuidv4 } from 'uuid'
import './App.css';

const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
  const [todos,setTodos]= useState([])
  const todoNameRef=useRef()

  useEffect(() =>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
    
  },[todos])

  function toggleTodo(id){
    const newTodos=[...todos]
    const todo=newTodos.find(todo=>todo.id===id)
    todo.complete=!todo.complete
    setTodos(newTodos)
  }
 
  function handleAddTodo(e){
    const name=todoNameRef.current.value
    if (name==='')return
      setTodos(prevtodos=>{
        return [...prevtodos,{id: uuidv4(),name:name,complete:false}]
      })
      todoNameRef.current.value=null
  }
  function handleClearTodos(){
    const newTodos=todos.filter(todos=>!todos.complete)
    setTodos(newTodos)
  }
  return (
    <div className="main">
      <h1>Todo List</h1>
   <input ref={todoNameRef} type="text"/>
   <button className="btn1" onClick={handleAddTodo}>Add</button>
   <button className="btn1" onClick={handleClearTodos}>Clear Complete</button>
   <TodoList todos={todos} toggleTodo={toggleTodo} /><br></br><br></br>
   <span className="left-todos">{todos.filter(todo=>!todo.complete).length} Todos Left </span>
   </div>
  );
}
export default App;
