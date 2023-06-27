import Head from 'next/head';
import {useEffect, useState} from "react";

export default function Home() {

    const [url, setUrl] = useState('http://localhost:3000');
    const [url2, setUrl2] = useState('http://localhost:3000');
    const [currentHost, setCurrentHost] = useState('http://localhost:3000');

    useEffect(() => {
        const host = `${window.location.protocol}//${window.location.host}`;
        setUrl(host);
        setUrl2(host);
        setCurrentHost(host);
    }, []);

    const onClickGo = () => {
        window.location.href = 'kurly://open?url=' + encodeURIComponent(url);
    };
    const onClickGo2 = () => {
        window.location.href = url2;
    };


    return (
        <div>
            <Head>
                <title>Link Opener</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>

            <main>
                <div>
                    <h2>location.href 이동</h2>
                    <input type="url" value={url2} onChange={(e) => setUrl2(e.currentTarget.value)} />
                    <button onClick={onClickGo2}>이동</button>
                </div>
                <hr />
                <div>
                    <h2>웹뷰딥링크 kurly://open?url=</h2>
                    <input type="url" value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
                    <button onClick={onClickGo}>이동</button>
                </div>
                <hr />
                <a href="https://www.kurly.com/goods/5119903">https://www.kurly.com/goods/5119903</a>
                <br />
                <br />
                <a href="https://universal-link-test-beryl.vercel.app/games/terraceKurly">https://universal-link-test-beryl.vercel.app/games/terraceKurly</a>
                <br />
                <br />
                <a href="https://goods.kurly.it/Kb6W">https://goods.kurly.it/Kb6W</a>
                <br />
                <br />
                <a href={currentHost+'/games/terraceKurly'}>게임링크(ex. www.kurly.com/games/terraceKurly)</a>
                <br />
                <br />
                <a href="kurly://games/terraceKurly?foo=bar">kurly://games/terraceKurly?foo=bar</a>
            </main>

            <footer></footer>
        </div>
    );
}
