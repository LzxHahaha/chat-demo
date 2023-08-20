'use client';

import { useCallback, useState } from 'react';
import styles from './page.module.css';
import classNames from 'classnames';

interface MessageData {
    left: boolean;
    content: string;
    time: number;
}

export default function Index() {
    const [list, setList] = useState([createMessage(true, 'Hello!')]);
    const [text, setText] = useState('');
    const send = useCallback(() => {
        const newList = list.concat([createMessage(false, text)]);
        setList(newList);
        setText('');
        setTimeout(() => {
            const reciveList = newList.concat([createMessage(true, `Recived Message: ${text}`)]);
            setList(reciveList);
        }, 1000);
    }, [text, list]);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <a href="/">{'<'}</a>
            </div>
            <div className={styles.content}>
                {list.map((el, index) => {
                    return (
                        <div key={`${el.time}-${index}`} className={classNames(styles.message, { [styles.left]: el.left })}>
                            {el.content}
                        </div>
                    );
                })}
            </div>
            <div className={styles.inputBox}>
                <input className={styles.input} value={text} onChange={e => setText(e.target.value)} />
                <span className={styles.send} onClick={send}>💬</span>
            </div>
        </div>
    );
}

function createMessage(left: boolean, content: string): MessageData {
    return {
        left,
        content,
        time: +new Date()
    }
}
