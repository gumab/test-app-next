import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace('https://universal-link-test-beryl.vercel.app/goods/123');
    }, 1000);
  }, []);
  return (
    <div>
      <Head>
        <title>Link Opener</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <main>
        <div>
          <h1>CPS 게이트웨이 테스트</h1>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
