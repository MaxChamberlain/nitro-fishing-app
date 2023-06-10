import { CircularProgress } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function UnprotectedRouteStrict({ redirect }: {
    redirect: JSX.Element
}){
    const user = useContext(UserContext);

    if(user.loadingUser){
        return(
            <div className='w-screen h-screen flex items-center justify-center'>
                <CircularProgress />
            </div>
        )
    }

    if(user.user){
        const urlParams = new URLSearchParams(window.location.search);
        const redirectCookie = urlParams.get('redirect_url')
        if(redirectCookie){
            return <Navigate to={redirectCookie} />
        }
        return <Navigate to={`/`} />
    }

    return redirect;
}