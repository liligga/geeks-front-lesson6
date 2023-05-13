import { useDispatch, useSelector } from "react-redux"
import { addTodo, toggleTodo, deleteTodo, fetchTodos, updateTodo } from "../store/todosReducer"
import { useEffect, useState } from "react"


const TodoList = () => {
    const {items, loading, error} = useSelector(state => state.todos)
    const [title, setTitle] = useState('')
    const [activeId, setActiveId] = useState(null)
    const [newTodo, setNewTodo] = useState('')
    const dispatch = useDispatch()

    const onAdd = () => {
        if (newTodo.trim() !== ''){
            dispatch(addTodo(newTodo))
            setNewTodo('')
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(updateTodo(
            {todoId: activeId, title: title}
        ))
        setTitle('')
        setActiveId(null)
    }

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    if (loading) return <h3>Данные загружаются</h3>
    if (error) return <h3>{error}</h3>

    return (
        <div>
            TodoList
            { activeId &&
                <form onSubmit={submitForm}>
                <input type="text" onChange={e => setTitle(e.target.value)} />
                <button type="submit">Отправить</button>
            </form>}
            <div>
                <input 
                    type="text" 
                    onChange={e => setNewTodo(e.target.value)} 
                    value={newTodo}
                />
                <button onClick={onAdd}>Добавить</button>
            </div>
            <div>
                {items.length>0 && 
                <ol>
                    {items.map(t => 
                        <li 
                            key={t.id}
                            
                        >{t.title}
                        <button onClick={e => setActiveId(t.id)}>Редактировать</button>
                        </li>
                    )}
                </ol>
                }
            </div>
            
            
        </ div>
    )
}
export default TodoList