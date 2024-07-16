import { User } from "../../interfaces/user.interface";

interface SignupCredentials {
    fullName: string;
    email: string;
    password: string;
}

interface SigninCredentials {
    email: string;
    password: string;
}

interface UserState {
    user: null | User;
    loading: boolean;
    error: null | string;
}



export {
    type SignupCredentials,
    type SigninCredentials,
    type UserState
}