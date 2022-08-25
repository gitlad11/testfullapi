import React, { useState } from 'react'
import { Typography, Button, Grid} from '@mui/material'
import Input from './input';
import styles from "../styles/Home.module.css"

function ModalForm(props){
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        setLoading(true)
        await props.handleAuthentication(name.trim(), email.trim(), password.trim())
        setLoading(false)
    }

    return (
        <div className='mod fadein'>
            <div className= "modal-c p-2 text-center">
                <Typography variant="h5" className="title">{props.type == 2 ? "Sign up" : "Log in"}</Typography>
                {!loading ? <div className="modal-f">
                    <div className='centered'>
                        {props.type == 2 && <Input type={"text"} placeholder={"name"} value={name} onChange={setName}/>}
                        <Input type={"text"} placeholder={"email"} value={email} onChange={setEmail}/>
                        <Input type={"password"} placeholder={"password"} value={password} onChange={setPassword}/>
                    </div>
                </div> : 
                <div className="d-flex justify-content-around" style={{ height : '300px',alignItems : 'center', flexDirection : "column" }}>
                        <div className={styles.ldsring}><div></div><div></div><div></div><div></div></div>
                </div>
                }

                <Grid className='buttons d-flex justify-content-around' container>
                    <Grid item xs={6}>
                        <Button className='m-1' variant='contained' color='primary' 
                                onClick={onSubmit}>{props.type == 2 ? "Sign up" : "Log in"}</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className='m-1' variant='contained' color='error' 
                                onClick={() => {props.handleModal(0)}} >back</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default ModalForm;