import { useDispatch } from "react-redux";
import { AppDispatch } from "../stores/store";



export const useAppDispatch = useDispatch.withTypes<AppDispatch>()