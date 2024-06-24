import { useEffect, useReducer, useState } from "react"
import OneTodo from "./OnetodoItem";
import './todo.scss'
import UseLocalStorage from "../custom_hooks/storage_hook";

interface todosTypeExample{
    id:number;
    todo:string;
    completed:boolean;
}

const todoExampe: todosTypeExample[]=[
    {
        id:1,
        todo:"work in the morning",
        completed:false
    },
    {
        id:2,
        todo:"work in the afternoon",
        completed:false

    },
    {
        id:3,
        todo:"work in the evening",
        completed:true
    },
    {
        id:4,
        todo:"work in the night",
        completed:false
    },
    {
        id:5,
        todo:"work in the next day",
        completed:true
    }
]
type actionType=
    |{type:"ADD_TODO",payload:{id:number,todo:string,completed:boolean}}
    |{type:"UPDATE_TODO",payload:{id:number,todo:string,completed:boolean}}
    |{type:"DELETE_TODO",payload:{id:number}}
    |{type:"TOGGLE_TODO",payload:{id:number}}

const todoReducer=(state:todosTypeExample[],action:actionType)=>{   
    switch(action.type){
        case "ADD_TODO":
            return [...state,{id:action.payload.id,todo:action.payload.todo,completed:action.payload.completed}]
        case "UPDATE_TODO":
            return state.map(todo=>{
                if(todo.id===action.payload.id){
                    return {...todo,todo:action.payload.todo,completed:action.payload.completed}
                }
                return todo
            })
        case "DELETE_TODO":
            return state.filter(todo=>todo.id!==action.payload.id)
        case "TOGGLE_TODO":
            return state.map(todo=>{
                if(todo.id===action.payload.id){
                    return {...todo,completed:!todo.completed}
                }
                return todo
            })
        default:
            return state
    }


}


const TodoService=()=>{
    const[todos,setTodos]= UseLocalStorage('todos',todoExampe)
    
    const [state, dispatch] = useReducer(todoReducer, todos);
    const [text,setText]=useState(' ')

    useEffect(()=>{
        setTodos(state)
    },[state,setTodos])
    
    const handleSubmit=(e: any)=>{
        e.preventDefault();
        if(text.trim()){
            dispatch({type:"ADD_TODO",payload:{id: state.length+1,todo:text,completed:false}})
            setText(' ')
        }
    }


    return(<>
        <div className="container">
            <div className="formInput" >
                <input value={text} onChange={(e)=>setText(e.target.value)} type="text" className="input"/>
                <button className="button" onClick={handleSubmit} >Add</button>
            </div>
            <ul className="listDiv">
                {state.map((todo,index)=>{
                    return <OneTodo key={index} todo={todo.todo} dispatch={dispatch} id={todo.id} setText={setText} completed={todo.completed}/>
                })}
            </ul>
            <div>
                bottom
            </div>
        </div>
    </>
    )
}

export default TodoService