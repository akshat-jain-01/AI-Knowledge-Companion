export const registerService = async(userData) =>{
    return {message : "Register service hit", data: userData}
}

export const loginService = async(Credentials) =>{
    return {message: 'login service hit', data: Credentials}
}