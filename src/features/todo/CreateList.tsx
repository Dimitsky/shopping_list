import { useState } from 'react';
import { useAppdispatch } from '../../app/hooks';
import { addList } from './todoSlice';
import { nanoid } from '@reduxjs/toolkit';
import styles from './CreateList.module.css';

export function CreateList() {
    const [value, setValue] = useState<string>('');
    const appDispatch = useAppdispatch();

    // Управляет textarea 
    const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }
    // Управляет кнопкой создания списка 
    const handleCreateList = () => {
        if (!value.trim()) return;
        
        const list = value.split(',').map((item) => ({
            id: nanoid(), 
            title: item.trim(), 
            completed: false, 
        }));

        appDispatch(addList(list));
    }

    return (
        <div
            className={styles.wrap}
        >
            <textarea
                className={styles.textarea}
                value={value}
                onChange={handleTextarea}
            ></textarea>
            <button
                className={styles.addBtn}
                onClick={handleCreateList}
            >
                Создать список
            </button>
        </div>
    );
}