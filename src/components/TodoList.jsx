import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo } from "../store/todosReducer"
import { useState } from "react"


const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const todos = useSelector(state => state.todos.items)
    const dispatch = useDispatch()

    const onAdd = () => {
        if (newTodo.trim() !== ''){
            dispatch(addTodo(newTodo))
            setNewTodo('')
        }
    }

    return (
        <div>
            TodoList
            <div>
                <input 
                    type="text" 
                    onChange={e => setNewTodo(e.target.value)} 
                    value={newTodo}
                />
                <button onClick={onAdd}>Добавить</button>
            </div>
            <div>
                {todos.length>0 && 
                <ol>
                    {todos.map(t => 
                        <li 
                            key={t.id}
                            onClick={e => dispatch(deleteTodo(t.id))}
                        >{t.text}</li>
                    )}
                </ol>
                }
            </div>
            
            
        </ div>
    )
}
export default TodoList