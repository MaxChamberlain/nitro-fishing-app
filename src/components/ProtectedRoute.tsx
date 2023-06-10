import { CircularProgress } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ redirect }: {
    redirect: JSX.Element
}){
    const user = useContext(UserContext);
    const location = useLocation();

    if(user.loadingUser){
        return(
            <div className='w-screen h-screen flex items-center justify-center'>
                <CircularProgress />
            </div>
        )
    }

    if(user.user){
        document.cookie=`redirect=; max-age=0; path=/`
        return redirect;
    }

    return <Navigate to={`/login${location.search}?redirect_url=${location.pathname}`} />
}