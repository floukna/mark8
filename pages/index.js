import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import BoxUpload from "../components/BoxUpload";
import Table from "../components/Table";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <BoxUpload setData={setData} setLoading={setLoading} />

      {loading ? (
        <div style={{ textAlign: "center" }}> ...Loading</div>
      ) : (
        data && (
          <Table
            head={data && data[0]}
            data={data && data.splice(1, data.length)}
          />
        )
      )}
      {/* {data && (
       
      )} */}
      {/* 
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Prompt:wght@400;500&display=swap");
        html,
        body {
          padding: 0;
          margin: 0;
          background: #f2f5f8;
          font-family: "Prompt", sans-serif;
          font-weight: 400;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
