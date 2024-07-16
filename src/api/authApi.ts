import { ROUTES, URL } from "../enums/apiRoutes";
import { SigninCredentials, SignupCredentials } from "../features/auth/types";


const signupApi = async (userCredentials: SignupCredentials) => {
    const response = await fetch(
      `${URL.API}${URL.AUTH}${ROUTES.REGISTER}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      }
    );
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return response.json();
  };

const signinApi = async (userCredentials: SigninCredentials) => {

    const response = await fetch(
      `${URL.API}${URL.AUTH}${ROUTES.LOGIN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      }
    );
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return response.json();
  };
  
const authenticateUserApi = async () => {

  
    const response = await fetch(
      `${URL.API}${URL.AUTH}${ROUTES.AUTHENTICATED_USER}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      }
    );
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return response.json();
  };


export {
    authenticateUserApi,
    signinApi,
    signupApi,
}