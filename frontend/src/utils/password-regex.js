function passwordRegex (newPassword, confirmNewPassword){
    if(newPassword === confirmNewPassword){
        if(newPassword.length < 6){
            return ({isVaild:false, msg: 'Password must be longer than 6 characters'})
        }else if(newPassword.search(/[a-z]/i) < 0){
            return ({isVaild:false, msg: 'Password must contain at least one letter'})
        }else if(newPassword.search(/[0-9]/i) < 0){
            return ({isVaild:false, msg: 'Password must contain at least one number'})
        }else if(newPassword.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/i) < 0){
            return ({isVaild:false, msg: 'Password must contain at least one special symbol'})
        }else{
            return ({isVaild:true})
        }
    }else{
        return ({isvaild:false, msg: 'New passwords do not match'})
    }
}

export {passwordRegex}