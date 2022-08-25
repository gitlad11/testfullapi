import React, {useState} from 'react'

import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material"

function Input(props){
    const [password, setPassword] = useState(true)
    const [error, setError] = useState("")
    
    ///field validation 
    const handleChange = (value) => {
        props.onChange(value)
        if(value.length < 1){
            setError("this field can not be empty!")
        } else {
            setError("")
        }
    }
    ///showing password function
    const handleShowPassword = () => {
        if(password){
            setPassword(false)
        } else{
            setPassword(true)
        }
    }

    return (
        <div className="mb-1">
          <div className="input-group">
                    <div className="input-group-prepend p-1">
                       {props.type == "text" ? <EmailIcon/> : <LockIcon/>}
                    </div>
                    <input type={props.type != 'text' && password ? props.type : "text"} 
                            onChange = {(event) => { handleChange(event.target.value) }}
                            value = {props.value}
                            className="form-control" 
                            placeholder={props.placeholder} 
                            aria-describedby="basic-addon1"/>
                    {props.type != "text" ? <div class="input-group-addon p-1">
                        <IconButton onClick={handleShowPassword}>
                            {password ? 
                                   <VisibilityIcon/>  : 
                                   <VisibilityOffIcon/> 
                        }
                        </IconButton>
                    </div> : <></>
                    }
            </div>
            <label style={{ color : "red" }} >
                {error}
            </label>
        </div>    
    )
}
export default Input;