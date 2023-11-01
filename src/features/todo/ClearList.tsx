import { clearList } from "./todoSlice";
import { useAppdispatch } from "../../app/hooks";
import styles from './ClearList.module.css';

export function ClearList() {
    const appDispatch = useAppdispatch();

    // 
    const handleClear = () => {
        appDispatch(clearList());
    }

    return (
        <button
            className={styles.clearBtn}
            onClick={handleClear}
        >
            Очистить список
        </button>
    );
}