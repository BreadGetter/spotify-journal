import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";


export default function Callback() {
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log(window.location.href)
        const response = await fetch('/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ callbackUrl: window.location.href }),

        });
        console.log(response);
        

        if (response.status === 200) {
          const results = await response.json();
          // Handle the success callback (e.g., redirect to a dashboard)
          console.log('Login successful');
          
          
          const mainResponse = await fetch('/main'); 
          if (mainResponse.ok) {
            const mainResults = await mainResponse.json();
            setUserData(mainResults);  
            window.location.href = `/${mainResults.id}`;
            
          }
          else {
            console.error('Main request failed');
          }
          


        } else {
          console.error('Callback request failed');
        }
      } catch (err) {
        console.error('Callback request failed', err);
      }
      finally {
        setLoading(false);
      }
    })();
  }, []);

   

  return (
    <>
      <Spinner animation="border" />
    </>
  )
}
