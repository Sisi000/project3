import axios from "axios";
const server = process.env.REACT_APP_SERVER;

//Used
export async function axiosPost(endpoint, payload){
    return await axios.post(
        server+endpoint,
        payload
    )
}
//Used
export async function axiosPostMPFD(endpoint,formData) {
    const result = await axios({
      method: "POST",
      url: server+endpoint,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  }
//Used
  export async function axiosPostMPFDAuth(endpoint,formData,userInfo) {
    const result = await axios({
      method: "POST",
      url: server+endpoint,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo}`
      },
    });
    return result.data;
  }
//Used
export async function axiosPostAuth(endpoint, payload ,userInfo){
    return await axios.post(
        server+endpoint,
        payload,
        {headers: {authorization: `Bearer ${userInfo}`},
        }
      );
}
//Used
export async function axiosPostFinalEndpointAuth(endpoint,product_id,finalEndpoint, payload, userInfo){
    return await axios.post(
        server+endpoint+product_id+finalEndpoint,
        payload,
        {
          headers: { Authorization: `Bearer ${userInfo}` },
        }
      );
}
//Used
export async function axiosDeletePost(endpoint,filename ){
  return await axios.post(server+endpoint, { Key: filename });
}

//Used
export async function axiosGet(endpoint){
    return await axios.get(server+endpoint);
  }
  
  //Used
  export async function axiosGetID(endpoint, id){
    return await axios.get(server+endpoint+id);
}

//Used
export async function axiosGetAuth(endpoint, userInfo){
    return await axios.get(server+endpoint, {
        headers: { Authorization: `Bearer ${userInfo}` },
      });
    }
    //Used
    export async function getParamsAuth(endpoint, detail, userInfo){
      return await axios.get(server+endpoint+detail, {
        headers: { Authorization: `Bearer ${userInfo}` },
      });
    }
    
    //Used
    export async function axiosDeleteByIDAuth(endpoint, id, userInfo){
      return await axios.delete(server+endpoint+id, {
        headers: { Authorization: `Bearer ${userInfo}` },
      });
    }
    
    //Used
    export async function axiosPutAuth(endpoint, payload, userInfo){
      return await axios.put(
        server+endpoint,
        payload,
        {
          headers: { Authorization: `Bearer ${userInfo}` },
        }
        );
      };
      
      //Used
      export async function axiosPutFinalEndpointAuth(endpoint,order,finalEndpoint,payload,userInfo){
        return await axios.put(
          server+endpoint+order+finalEndpoint,
          payload,
          {
            headers: { authorization: `Bearer ${userInfo}` },
          }
          );
        }
        //Used
        export async function axiosPutIdAuth(endpoint, Id, payload, userInfo){
          return await axios.put(
        server+endpoint+Id,
        payload,
        {
          headers: { Authorization: `Bearer ${userInfo}` },
        }
        );
      };
      
      /*
      export async function postProductImage(endpoint, payload, userInfo){
          return await axios.post(
            server+endpoint, 
              payload, 
              {headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${userInfo}`,
              },
            });
      }
      */

      /*
      export async function axiosDeliverRequestAuth(endpoint,order, userInfo){
        return await axios.put(server+endpoint+order+`/deliver`,
    {},
    {
      headers: { authorization: `Bearer ${userInfo}` },
    } 
    )
  };
  */
 
