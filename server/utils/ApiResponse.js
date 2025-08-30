const ApiResponse = (statuscode, data, message = "Success") => {
    const code = typeof statuscode === 'number' ? statuscode : 500;
    const success = code >= 200 && code <= 300; 
    return {success,statuscode:code,data:success?data:null,message,...(!success && { errors: data }) }
}
module.exports= ApiResponse