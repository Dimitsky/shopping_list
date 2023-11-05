import { useRef } from "react";
import { useAppSelector } from "./app/hooks";
import { TodoList } from "./features/todo/TodoList";
import { CreateList } from "./features/todo/CreateList";
import { ClearList } from "./features/todo/ClearList";
import type { Todo } from "./features/todo/types/types";
import './App.css';
import { AddTodo } from "./features/todo/AddTodo";
import { Menu } from "./features/menu/Menu";

function App() {
    const todoList = useAppSelector((state) => state.todo);
    const appWrapperRef = useRef<HTMLDivElement | null>(null);

    const sortedTodoList = [...todoList]
        .sort((a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        }).sort((a: Todo, b: Todo) => {
            if (a.completed > b.completed) return 1;
            if (a.completed < b.completed) return -1;
            return 0;
        });

    return (
        <div
            className="appWrapper"
            id="appWrapper"
            ref={appWrapperRef}
        >
            <Menu />
            {sortedTodoList.length ? (
                <>
                    <TodoList list={sortedTodoList}/>
                </>
            ) : (
                <CreateList />
            )}
        </div>
    )
}

export default App;
