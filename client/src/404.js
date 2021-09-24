import React, { useState,useEffect } from "react";
import {Redirect,useHistory} from "react-router-dom"
import Breadcrumb from "./components/tools/breadCrumbs"
function Page404(props) {
    const [timeLeft, setTimeLeft] = useState(15);

    const history = useHistory()

    if(timeLeft<1)
    var back =history.goBack()
 
    useEffect(() => {
      if (!timeLeft) return;
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timeLeft]);
     
     
    return (
      <div>
        <Breadcrumb/>
        {timeLeft===0 ? <Redirect to={back} />:null}
      <h1>This is 404 page</h1>
        <h1>{timeLeft}</h1>
      <div id="countdown"></div>
    </div>
  );
}

export default Page404;
