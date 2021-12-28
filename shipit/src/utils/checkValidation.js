const required = (propertyType) => {
  return v => v && v.length > 0 || `You must input a ${propertyType}`
}

const minLength = (propertyType, minLength) => {
  return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
}

const maxLength = (propertyType, maxLength) => {
  return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
}

const email = propertyType => {
  if(propertyType.length > 0) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(propertyType).toLowerCase()) || 'Invalid e-mail.';
  }
}
const phoneRule = propertyType => {
  if(propertyType.length > 0) {
    const pattern=/^\+?84?\d{9,15}$/
    return pattern.test(propertyType) || 'Invalid phone number.';
  }
}

const passwordRule = password => {
  if(password.length > 0) {
    let error = ''
    let flag = true
    const upper_case = /(?=.*?[A-Z])/
    const lower_case = /(?=.*?[a-z])/
    const one_digit = /(?=.*?[0-9])/
    const one_special_character = /(?=.*?[#?!@$%^&*-])/
    const Minimum_eight = /.{8,}/
    if (!upper_case.test(String(password))) {
      error += 'password have at least one upper case English letter.\n'
      flag = false
    }
    if (!lower_case.test(String(password))) {
      error += 'password have at least one lower case English letter.\n'
      flag = false
    }
    if (!one_digit.test(String(password))) {
      error += 'password have at least one digit \n'
      flag = false
    }
    if (!one_special_character.test(String(password))) {
      error += 'password have At least one special character.\n'
      flag = false
    }
    if (!Minimum_eight.test(String(password))) {
      error += '\n password have minimum eight in length.\n'
      flag = false
    }
    return flag || error
  }
}




export default {required, maxLength, minLength, passwordRule, phoneRule, email}

