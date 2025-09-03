import { useEffect } from "react"
import authService from "../../services/authService"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAuthData } from "../../store/Features/authSlice"
const OAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

   useEffect(() => {
       const timer = setTimeout(async () => {
           const res = await authService.isLoggedIn();
           if (res.success) {
               dispatch(setAuthData({ ...res.data, isLoggedIn: true }));
               navigate("/dashboard");
           } else {
               toast.error(res.message);
               navigate("/auth/login");
           }
       }, 500); // small delay lets cookies settle

       return () => clearTimeout(timer);
   }, []);


    return (
        <div>OAuth</div>
    )
}

export default OAuth
