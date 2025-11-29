export const registerUser = async(req, res) =>{
    try{
        res.status(200).json({message: "Register endpoint is working"})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
}

export const loginUser = async(req, res) =>{
    try{
        res.status(200).json({message : "Login endpoint is working"})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
}