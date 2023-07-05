import Head from 'next/head';
import { NextPageContext } from 'next';

export default function Any({ headers, url }: ServerProp<typeof getServerSideProps>) {
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
      <h2>{url}</h2>
      <textarea defaultValue={JSON.stringify(headers)} />
    </div>
  );
}

export const getServerSideProps = async ({ req }: NextPageContext) => {
  return { props: { headers: req.headers, url: req.url } };
};
