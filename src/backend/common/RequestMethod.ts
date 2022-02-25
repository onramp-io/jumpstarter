const RequestMethod = {
  // Create
  POST: "POST",
  // Read
  GET: "GET",
  // Update
  PUT: "PUT",
  PATCH: "PATCH",
  // Destroy
  DELETE: "DELETE",
};

export default RequestMethod;

/** 
 * 
 const submitForm = () => {
   const {createApiPayload: CreateParamsInterface} = req.body;
   
   submitHandler = () => {
     axios({
       method: 'post',
       url: `https://${process.env.DOMAIN}/projects`,
       data: createApiPayload
     });
   }
 
   return (
     <Button onClick={submitHandler}/>
   );
 }

 */
