import Head from 'next/head';
import { useEffect } from 'react';
import { NextPageContext } from 'next';

export default function Home({ isWebView }: ServerProp<typeof getServerSideProps>) {
  useEffect(() => {
    if (!isWebView) {
      try {
        window.location.assign(`kurly://open?url=${encodeURIComponent(location.href)}`);
      } catch (e) {
        // DO NOTHING
      }
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Link Opener</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <main>
        <div>
          <h1>컬리페이 페이지가 뜰 것입니다</h1>
          <h2>{isWebView ? '앱에서 동작중' : 'Mobile 웹에서 동작중'}</h2>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  const isWebView = /kurly/i.test(userAgent);
  return { props: { isWebView } };
};
