import react from 'react'
import {Outlet} from "react-router-dom";

function Navbar(){
    return(
        <>
            <Outlet /> 
        </>
    )
}
export default Navbar