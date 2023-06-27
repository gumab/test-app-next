import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useState} from "react";

export default function Home() {
    const [url, setUrl] = useState('http://localhost:3000/test')

    const onClickGo = () => {
        window.location.href = 'kurly://open?url=' + encodeURIComponent(url)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Tester Home</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            </Head>

            <main>
                <input type="url" value={url} onChange={(e) => setUrl(e.currentTarget.value)}/>
                <button onClick={onClickGo}>이동</button>
            </main>

            <footer>
            </footer>
        </div>
    )
}
