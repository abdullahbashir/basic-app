import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [userResponse, setUserResponse] = useState(null);

  // Fetch GET route
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        setMessage(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // // Send POST request
  const sendUser = async () => {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Abdullah", age: 25 }),
    });

    const data = await response.json();
    setUserResponse(data);
  };

  console.log(process.env.REACT_APP_SECRET);
  console.log(process.env.REACT_APP_API_URL);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>React + Express Test</h1>
      <p>GET Response from Express: {message}</p>



      <button onClick={sendUser}>Send POST to Express</button>

      {userResponse && (
        <pre style={{ textAlign: "left", width: "300px", margin: "20px auto" }}>
          {JSON.stringify(userResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
