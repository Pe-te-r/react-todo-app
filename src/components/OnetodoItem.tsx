import './'
type TodoProps = {
    todo: string;
    id: number;
  };

const OneTodo: React.FC<TodoProps>=({todo,id})=>{
    return(
        <li>
            <p>{id}</p>
            <p>{todo}</p>
        </li>
    )
}

export default OneTodo