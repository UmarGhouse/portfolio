import React, { useState } from 'react'

function Login({ onClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        onChange={event => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={event => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          onClick(username, password);
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login