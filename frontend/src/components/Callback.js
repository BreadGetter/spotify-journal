import React, { useEffect } from 'react';


function Callback() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await fetch('/callback');

        if (response.status === 200) {
          // Handle the success callback (e.g., redirect to a dashboard)
          console.log('Login successful');
        } else {
          console.error('Callback request failed');
        }
      } catch (error) {
        console.error('Error during callback:', error);
      }
    };

    handleCallback();
  }, []);

  return (
    <div>
      <p>Processing login...</p>
    </div>
  );
}

export default Callback;