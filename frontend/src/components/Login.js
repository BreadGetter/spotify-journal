import { useEffect, useState } from "react";

export default function Login() {
  const [loginUrl, setLoginUrl] = useState(null); 

  const handleLogin = async () => {
    if (loginUrl === null) {
      const response = await fetch('/api/login');
      if (response.ok) {
        const results = await response.json();
        setLoginUrl(results.loginUrl);
        window.location.href = results.loginUrl;
      } else {
        console.error('Login URL request failed');
      }
    } else {
      window.location.href = loginUrl;
    }
  };
  
  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}