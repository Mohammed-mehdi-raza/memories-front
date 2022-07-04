import React from 'react';
import{TextField,Grid,InputAdornment,IconButton} from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input=({name,label,autoFocus,handleChange,type,handleShowPassword,half})=>{
    return(
        <Grid item xs={12} sm={half?6:12}>
            <TextField
             name={name}
             label={label}
             required
             autoFocus={autoFocus}
             onChange={handleChange}
             type={type}
             variant="outlined"
             fullWidth
             InputProps={name==="password"?{
                 endAdornment:(
                     <InputAdornment position="end">
                         <IconButton onClick={handleShowPassword}>
                             {type==="password" ?<VisibilityIcon/>:<VisibilityOffIcon/>}
                         </IconButton>
                     </InputAdornment>
                 )
             }:null}
            />
        </Grid>
    )
}

export default Input;