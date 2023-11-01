import { useRef } from "react";
import { addTodo } from "./features/todo/todoSlice";
import { useAppSelector, useAppdispatch } from "./app/hooks";
import { TodoList } from "./features/todo/TodoList";
import './App.css';
import { CreateList } from "./features/todo/CreateList";
import { ClearList } from "./features/todo/ClearList";

function App() {
    const appDispatch = useAppdispatch();
    const todoList = useAppSelector((state) => state.todo);
    const appWrapperRef = useRef<HTMLDivElement | null>(null);

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
            {todoList.length ? (
                <>
                    <ClearList />
                    <TodoList list={todoList}/>
                </>
            ) : (
                <CreateList />
            )}
        </div>
    )
}

export default App;
