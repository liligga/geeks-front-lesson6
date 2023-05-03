import { createSlice, nanoid } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: []
    },
    reducers: {
        addTodo: (state, action) => {
            // {id: 1, text: 'fsdfsd', completed: false}
            state.items.push(
                {
                    id: nanoid(),
                    text: action.payload,
                    completed: false
                }
            )
        },
        deleteTodo: (state, action) => {
            // удаляем по индексу в массиве. 
            // ищем идекс по переданному в экшн ктиэйтер id
            const todoIndex = state.items.findIndex(t => t.id === action.payload)
            console.log(todoIndex);
            if (todoIndex >= 0) {
                state.items.splice(todoIndex, 1)
            }
        }
    }
})

export const { addTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer