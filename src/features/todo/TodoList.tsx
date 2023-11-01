import type { Todo } from './types/types';
import styles from './TodoList.module.css';
import { TodoItem } from './TodoItem';

type TodoListProps = {
    list: Array<Todo>, 
}

export function TodoList({ list }: TodoListProps) {
    return (
        <ul
            className={styles.list}
            id="todoList"
        >
            {list.map((todo) => (
                <li
                    className={styles.item}
                    id="item_wrapper"
                    key={todo.id}
                >
                    <TodoItem item={todo} />
                </li>
            ))}
        </ul>
    )
}