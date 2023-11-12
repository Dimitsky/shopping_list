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
            {list.map((todo, index, arr) => {
                const prevFirstLetter = index === 0 ? arr[index].title[0]?.toUpperCase() : arr[index - 1].title[0]?.toUpperCase();
                const currFirstLettre = arr[index].title[0]?.toUpperCase();

                return (
                    <li
                        className={styles.item}
                        key={todo.id}
                    >
                        {(prevFirstLetter !== currFirstLettre || index === 0) && <h3 className={styles.heading}>{currFirstLettre}</h3>}
                        <div
                            className={styles.inner}
                        >
                            <TodoItem item={todo}/>
                        </div>
                    </li>
                );
            })}
        </ul>
    )
}