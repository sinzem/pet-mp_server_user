export class ApiError extends Error {
    status: number;
    details: any;

    constructor(status: number, message: string, details: any = undefined) {
        super(message);
        this.status = status;
        this.details = details;
        this.name = 'ApiError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
  
    static badRequest(message = 'Bad Request', details: any) { 
        return new ApiError(400, message, details); 
    }

    static unauthorized(message = 'Unauthorized', details: any) { 
        return new ApiError(401, message, details); 
    }

    static forbidden(message = 'Forbidden', details: any) { 
        return new ApiError(403, message, details); 
    }

    static notFound(message = 'Not Found', details: any) { 
        return new ApiError(404, message, details);
    }

    static conflict(message = 'Conflict', details: any) { 
        return new ApiError(409, message, details); 
    }

    static unprocessable(message = 'Unprocessable Entity', details: any) { 
        return new ApiError(422, message, details); 
    }

    static internal(message = 'Internal Server Error', details: any) { 
        return new ApiError(500, message, details); 
    }
}


// export class ApiError extends Error {
//     statusCode: number;
  
//     constructor(statusCode: number, message: string) {
//         super(message);
//         this.statusCode = statusCode;
//     }
  
//     static badRequest(message = "Bad request") {
//         return new ApiError(400, message);
//     }
  
//     static unauthorized(message = "Unauthorized") {
//         return new ApiError(401, message);
//     }
  
//     static forbidden(message = "Forbidden") {
//         return new ApiError(403, message);
//     }
  
//     static notFound(message = "Not found") {
//       return new ApiError(404, message);
//     }
  
//     static internal(message = "Internal server error") {
//         return new ApiError(500, message);
//     }
//   }
  
