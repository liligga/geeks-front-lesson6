import { createSlice } from '@reduxjs/toolkit'


const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        // Immer 
        // Mutable - изменяемый
        // Immutable - неизменяемый
        incr: state => {
            state.value += 1
        },
        decr: state => {
            state.value -= 1
        }
    }
})

export const { incr, decr } = counterSlice.actions
export default counterSlice.reducer
