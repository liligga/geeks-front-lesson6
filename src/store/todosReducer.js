import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// CRUD 
// Create - создать    POST
// Read - много Todo   GET
// Read - один Todo    GET (:id)
// Update - изменить   PUT, POST (:id)
// Delete - удалить    DELETE (:id)

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        return axios
            .get('https://jsonplaceholder.typicode.com/todos?_limit=15')
            .then(resp => resp.data)
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({todoId, title}) => {
        return axios
            .put(`https://jsonplaceholder.typicode.com/todos/${todoId}`,
                {
                    "userId": 1,
                    "title": title,
                    "completed": false
                }
            )
            .then(resp => resp.data)
    }
)


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: ''
    },
    reducers: {
        addTodo: (state, action) => {
            // {id: 1, text: 'fsdfsd', completed: false}
            state.items.push(
                {
                    id: nanoid(),
                    title: action.payload,
                    completed: false
                }
            )
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(
                item => item.id === action.payload
            )
            if (todo) {
                // !true -> false, !false -> true
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action) => {
            const todoIndex = state.items.findIndex(
                item => item.id === action.payload
            )
            if (todoIndex > -1) {
                state.items.splice(todoIndex, 1)
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.items = action.payload
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.items = []
            state.error = action.error.message
        })
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            const todoIndex = state.items.findIndex(
                item => item.id === action.payload.id
            )
            if (todoIndex > -1) {
                state.items[todoIndex] = action.payload
            }
        })
    }
})


export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
