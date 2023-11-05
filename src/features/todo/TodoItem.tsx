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
            <label className={styles.checkboxWrap}>
                <div 
                    className={styles.checkboxInner}
                >
                    <input 
                        className={styles.checkboxInput}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleToggle}
                    />
                </div>
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
            <button
                className={styles.infoBtn}
            >
                <svg 
                    className={styles.infoIcon} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
            </button>
        </>
    )
}