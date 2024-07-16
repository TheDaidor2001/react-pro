import React from "react";
import { ROUTES } from "../enums/apiRoutes";

function RedirectToHome(): null {
    React.useEffect(() => {
      window.location.replace(ROUTES.HOME);
    }, []);
  
    return null;
}



export {
  RedirectToHome
}