import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/

const calculateTimeDifference = (serverTime: Date, clientTime: Date) => {
  const difference = moment(serverTime).diff(clientTime);
  const duration = moment.duration(difference);
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  
};
export async function getServerSideProps() {
  const serverTime = new Date().toISOString();
  return { props: { serverTime } };
}

export default function Home({serverTime}) {
  const router = useRouter();

  const [timeDifference, setTimeDifference] = useState("");

  useEffect(() => {
    const clientTime = new Date();
    const difference = calculateTimeDifference(serverTime, clientTime);
    setTimeDifference(difference);
  }, [serverTime]);
  
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{moment(serverTime).format("DD-MM-YYYY HH:mm")}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

