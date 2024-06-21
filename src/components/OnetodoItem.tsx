import './OnetodoItem.scss'
type TodoProps = {
    todo: string;
    id: number;
    dispatch: any;
    setText: any;
    completed: boolean;
  };

const OneTodo: React.FC<TodoProps>=({todo,id,dispatch,setText,completed})=>{
    const updateTodo=()=>{
        setText(todo)
        dispatch({type:"UPDATE_TODO",payload:{id:id,todo:todo,completed:false}})
    }
    const deleteTodo=()=>{
        dispatch({type:"DELETE_TODO",payload:{id:id}})
    }
    const togleTodo=()=>{
        dispatch({type:"TOGGLE_TODO",payload:{id:id}})
        }
        return(
        <li>
            <input type="checkbox" checked={completed} onChange={() => togleTodo()} />
            {/* <p>{id}</p> */}
            <p>{todo}</p>
            <div className="btns">
                <button onClick={updateTodo}>update</button>
                <button onClick={deleteTodo}>delete</button>
                {/* <button onClick={togleTodo}>completed</button> */}
            </div>
        </li>
    )
}

export default OneTodo