import { useEffect, useState, useRef } from 'react';
import { useAppdispatch } from '../../app/hooks';
import { editTodo, removeTodo, toggleTodo } from './todoSlice';
import type { Todo } from "./types/types";
import styles from './TodoItem.module.css';

type TodoItemProps = {
    item: Todo, 
}

export function TodoItem({ item: todo}: TodoItemProps) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(todo.title);
    const titleRef = useRef<HTMLInputElement | null>(null);

    const appDispatch = useAppdispatch();

    // Отмечает todo, как завершенное/незавершенное 
    const handleToggle: React.ChangeEventHandler<HTMLInputElement> = () => {
        appDispatch(toggleTodo(todo.id));
    };
    // Обработчик текстового поля редактирования заголовка 
    const handleEditTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
    }
    // Включить режим редактирования 
    const handleEnableEditMode: React.MouseEventHandler<HTMLParagraphElement> = () => {
        setIsEditMode(true);
    }

    // Используем эффекты для работы с фокусом элемента в DOM
    useEffect(() => {
        if (!isEditMode || titleRef.current === null) return 

        // Фокусируемся на поле редактирования заголовка сразу после его появления на экране 
        titleRef.current.focus();

        // После потери фокуса, произвести все необходимые обновления UI
        const handleBlur = () => {
            if (titleRef.current) {
                // Выйти из режима редактирования 
                setIsEditMode(false);

                // Если после редактирования заголовок пуст, то удалить todo
                if (!title) {
                    appDispatch(removeTodo(todo.id));

                    return;
                }

                // Если заголовок изменен, то отправить изменение в redux
                if (todo.title !== title) {
                    appDispatch(editTodo({id: todo.id, newTitle: title}));
                }
            }
        };
        titleRef.current.addEventListener('blur', handleBlur);

        return () => {
            if (titleRef.current !== null) {
                titleRef.current.removeEventListener('blur', handleBlur);
            }
        }
    });

    return (
        <>
            <label className={styles.container}>
                <input 
                    className={styles.checkbox}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                />
                <span
                    className={styles.checkmark}
                ></span>
            </label>
            {/* В режиме редактирования, меняем <p> на текстовый <input /> */}
            {isEditMode ? (
                <input 
                    className={styles.titleInput}
                    type="text"
                    ref={titleRef}
                    value={title}
                    onChange={handleEditTitle}
                />
            ) : (
                <p
                    className={todo.completed ? `${styles.title} ${styles.titleCompleted}` : styles.title}
                    onClick={handleEnableEditMode}
                >
                    {todo.title}
                </p>
            )}
        </>
    )
}