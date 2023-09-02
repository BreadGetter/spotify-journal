
export default function Login() {
    const handleLogin = async () => {
      try {
        const response = await fetch('/login');
  
        if (response.status === 200) {
          // Redirect the user to the Spotify login page
          const results = await response.json();
          window.location.href = results.loginUrl;
          console.log(response.data.loginUrl);
        } else {
          console.error('Login request failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    return (
      <div>
        <button onClick={handleLogin}>Login with Spotify</button>
      </div>
    );
  }