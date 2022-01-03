function  validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validatePhone(phone){
    const pattern = /^\+?84?\d{9,15}$/
    return pattern.test(phone);
}
function validateTime(unix_timestamp){
    let date = new Date(unix_timestamp );
    // let hours = date.getHours();
    // let minutes = "0" + date.getMinutes();
    // let seconds = "0" + date.getSeconds();
    // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return String(date).substr(0,10)
}
export {validateEmail, validatePhone, validateTime}

