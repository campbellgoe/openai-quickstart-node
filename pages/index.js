import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [codeInput, setCodeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Concise code</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/code.png" className={styles.icon} />
        <h3>Explain my code in a concise way</h3>
        <form onSubmit={onSubmit}>
          <textarea
            className={styles.codeInput}
            name="code"
            placeholder="Paste code here"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <input type="submit" value="Explain my code" />
        </form>
        <pre className={styles.result}>{result}</pre>
      </main>
    </div>
  );
}
