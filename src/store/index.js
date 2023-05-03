import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterReducer'
import todosReducer from './todosReducer'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todosReducer
    }
})

