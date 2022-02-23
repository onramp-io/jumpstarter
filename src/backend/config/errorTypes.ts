export function jsError(code, status, message) {
    this.code = code; // Ex. StatusCodes.INTERNAL_SERVER_ERROR
    this.status = status; // Ex. getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    this.message = message; //optional additional error message
}