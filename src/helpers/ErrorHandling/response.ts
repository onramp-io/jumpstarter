export const clientResponse = async (response, code, status, message, data?) => {
    if (data) {
        response.status(code).json({
            status: status,
            message: message,
            data
        }); 
    } else {
        response.status(code).json({
            status: status,
            message: message,
        }); 
    }
}