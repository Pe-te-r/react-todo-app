import { useReducer } from "react"
import OneTodo from "./OnetodoItem";
import './todo.scss'

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
        default:
            return state
    }

}


const TodoService=()=>{
    const [state, dispatch] = useReducer(todoReducer, todoExampe);
    
    const handleSubmit=(e: any)=>{
        e.preventDefault();
        dispatch({type:"ADD_TODO",payload:{id: state.length+1,todo:e.target[0].value,completed:false}})
        e.target[0].value=""
    }
    return(<>
        <div className="container">
            <form className="formInput" onSubmit={handleSubmit}>
                <input type="text" className="input"/>
                <button className="button">Add</button>
            </form>
            <ul className="listDiv">
                {state.map((todo,index)=>{
                    return <OneTodo key={index} todo={todo.todo} id={todo.id}/>
                })}
            </ul>
        </div>
    </>
    )
}

export default TodoService