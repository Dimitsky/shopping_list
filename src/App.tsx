import { useRef } from "react";
import { addTodo } from "./features/todo/todoSlice";
import { useAppSelector, useAppdispatch } from "./app/hooks";
import { TodoList } from "./features/todo/TodoList";
import { CreateList } from "./features/todo/CreateList";
import { ClearList } from "./features/todo/ClearList";
import type { Todo } from "./features/todo/types/types";
import './App.css';

function App() {
    const appDispatch = useAppdispatch();
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

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;

        if (target.closest('#todoList')) return

        appDispatch(addTodo('Новый продукт'));
    }

    return (
        <div
            className="appWrapper"
            id="appWrapper"
            ref={appWrapperRef}
            onDoubleClick={handleDoubleClick}
        >
            {sortedTodoList.length ? (
                <>
                    <ClearList />
                    <TodoList list={sortedTodoList}/>
                </>
            ) : (
                <CreateList />
            )}
        </div>
    )
}

export default App;
