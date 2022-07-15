import axios from "axios";
const server = process.env.SERVER;

export async function post(endpoint, payload){
    return await axios.post(
        server+endpoint,
        payload
    )
}

export async function postImage(endpoint,formData) {
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

export async function postInfo(endpoint, payload ,userInfo){
    return await Axios.post(
        server+endpoint,
        payload,
        {headers: {authorization: `Bearer ${userInfo}`},
        }
      );
}

export async function putReviewsAuth(endpoint,product_id, payload, userInfo){
    return await axios.post(
        server+endpoint+product_id+`/reviews`,
        payload,
        {
          headers: { Authorization: `Bearer ${userInfo}` },
        }
      );
}

export async function postProductImage(endpoint, payload, userInfo){
    return await axios.post(server+endpoint, 
        payload, 
        {headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo}`,
        },
      });
}

export async function deleteAdditionals3(endpoint,filename ){
    return await axios.post(server+endpoint, { Key: filename });
}


export async function get(endpoint){
    return await axios.get(server+endpoint);
}

export async function getID(endpoint, id){
    return await axios.get(server+endpoint+id);
}

export async function getAuth(endpoint, userInfo){
    return await axios.get(server+endpoint, {
        headers: { Authorization: `Bearer ${userInfo}` },
      });
}

export async function getParamsAuth(endpoint, detail, userInfo){
    return await axios.get(server+endpoint+detail, {
        headers: { Authorization: `Bearer ${userInfo}` },
      });
}

export async function deleteByID(endpoint, id, userInfo){
    return await axios.delete(server+endpoint+id, {
        headers: { Authorization: `Bearer ${userInfo}` },
      });
}


export async function putPay(endpoint,order,payload,userInfo){
    return await axios.put(
        server+endpoint+order._id+`/pay`,
        payload,
        {
          headers: { authorization: `Bearer ${userInfo}` },
        }
      );
}

export async function deliverRequest(endpoint,order, userInfo){
    return await axios.put(server+endpoint+order+`/deliver`,
    {},
    {
      headers: { authorization: `Bearer ${userInfo}` },
    } 
  )
};

export async function putProduct(endpoint, productId, payload, userInfo){
    return await axios.put(
        server+endpoint+productId,
        payload,
        {
          headers: { Authorization: `Bearer ${userInfo}` },
        }
      );
}
