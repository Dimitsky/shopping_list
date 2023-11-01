import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from './types/types'

const initialState: Array<Todo> = [];

const todoSlice = createSlice({
    name: 'todo', 
    initialState, 
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.push(action.payload);
            }, 
            prepare: (title: string) => {
                return {
                    payload: {
                        id: nanoid(), 
                        title, 
                        completed: false, 
                    }
                }
            }, 
        }, 
        removeTodo(state, action: PayloadAction<string>) {
            return state.filter((todo) => todo.id !== action.payload);
        }, 
        toggleTodo(state, action: PayloadAction<string>) {
            state.map((todo) => {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed;
                }

                return todo;
            })
        }, 
        editTodo(state, action: PayloadAction<{id: string, newTitle: string}>) {
            state.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.title = action.payload.newTitle;
                }

                return todo;
            })
        }, 
        addList(state, action: PayloadAction<Array<Todo>>) {
            state.push(...action.payload);
        }, 
        clearList() {
            return [];
        }
    }
});

export const { addTodo, removeTodo, toggleTodo, editTodo, addList, clearList } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;