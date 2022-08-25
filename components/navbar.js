import React, { useEffect, useState } from "react"
import { Button, Typography, TextField } from "@mui/material"
import Image from "next/dist/client/image";
import logo from '../public/logos/reddit.png'


function Navbar(props){
    const [user, setUser] = useState()

    const onExit = () => {
        localStorage.removeItem("token")
        setUser()

    }

    useEffect(() => {
        setUser(localStorage.getItem("token"))
    },[props])
    

    return (
        <div className="navbar container-fluid p-3" >
            <div className="logo d-flex ">
                <Image height={48} width={48} src={logo} />
                <Typography className="m-1" variant="h6">Redditlike</Typography>
            </div>
            <div className="search-forms">
            <TextField id="outlined-basic" label="Search" variant="outlined" value={props.search} onChange={(event) => { props.onSearch(event.target.value) }}/>
            </div>
            {!user ?
                <div className="buttons">
                <Button variant="outlined" onClick={() => {props.handleModal(1)}} >Log in</Button>
                <Button className="m-1" variant="contained"  onClick={() => {props.handleModal(2)}}>Sign up</Button>
            </div> :
            <div className="buttons" >
                <Button onClick={onExit} variant="contained" color="primary" >exit</Button>
            </div>
            }
        </div>
    );
}
export default Navbar;