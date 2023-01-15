import { useState, useEffect } from 'react';

const TokenListener = () => {
  const [message, setMessage] = useState("Checking token...");
  const refreshTime = 60000; // 1 minute

  useEffect(() => {
    const checkToken = setInterval(() => {
      const tokenExpireDate = localStorage.getItem('tokenExpireDate');
      if (tokenExpireDate && new Date(tokenExpireDate) < new Date()) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpireDate');
        setMessage("Token Expired");
        clearInterval(checkToken);
        // navigate to /me
        window.location.href = "/?tokenExpired=true";
      }else if(!tokenExpireDate){
        setMessage("No token");
      }else {
        setMessage("OK");
      }
    }, refreshTime);

    return () => clearInterval(checkToken);
  }, []);

//   return <div>{message}</div>;
};

export default TokenListener;
