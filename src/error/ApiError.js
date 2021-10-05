class ApiError{
   constructor(status, message, response,error){
       this.status = status;
       this.message = message;
       this.response = response;
       this.error = error 
   }
   static badRequest(msg){
       return  new ApiError(400,msg)
   }
   static internal(msg){
       return new ApiError(500,msg)
   }
   static notFound(msg="there is no route in this name"){
       return new ApiError(404,msg)
   }
}

module.exports=ApiError;
