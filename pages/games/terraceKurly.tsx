import Head from 'next/head';
import { NextPageContext } from 'next';
import { useEffect, useRef } from 'react';

export default function Iframe({ isWebView, isIOS }: ServerProp<typeof getServerSideProps>) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isWebView || isIOS) {
      return;
    }

    location.href = 'kurly://games/terraceKurly?foo=bar';
  }, []);

  const onClickGoApp = () => {
    location.href = 'kurly://games/terraceKurly?foo=bar';
  };
  const onClickGoInstall = () => {
    if (isIOS) {
      window.open('https://apps.apple.com/kr/app/id1080244833');
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.dbs.kurly.m2');
    }
  };

  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <Head>
        <title>Iframe Tester</title>
        <link rel="alternate" href="android-app://com.dbs.kurly.m2/https/www.stg.kurly.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      {isWebView ? (
        <>
          <h1>게임이 실행되고 있다고 생각해봐</h1>
        </>
      ) : (
        <div style={{ padding: '20px' }}>
          <h1>게임은 컬리앱에서만 가능합니다</h1>
          <br />
          <button onClick={onClickGoInstall}>앱 설치하기</button>
          <br />
          <br />
          <button ref={(r) => (ref.current = r)} onClick={onClickGoApp}>
            앱열기
          </button>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  const isWebView = /kurly/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  return { props: { isWebView, isIOS } };
};
