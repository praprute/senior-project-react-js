import { API } from './../../config'

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
  
      })
    .catch(err => {
        console.log(err)
      })
};

export const createProduct = (userId, token, product) => {
  product.append('farmer', userId)
  return fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
      },
      body: product
      
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const listOrders = (userId, token, farmer) => {
    // var farmerId = JSON.parse(farmer)
    // console.log('api')
    // console.log(farmer)
    return fetch(`${API}/order/list/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body : JSON.stringify({id : farmer})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };


  export const getStatusValues = (userId, token, farmer) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };

  export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        body:JSON.stringify({status, orderId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };
  
  export const getProducts = (userId, token) => {
    return fetch(`${API}/productsFarmer/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body : JSON.stringify({userId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  }

  export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// export const updateProduct = (productId, userId, token, product) => {
//     return fetch(`${API}/product/${productId}/${userId}`, {
//         method: 'PUT',
//         headers: {
//             Accept: 'application/json',
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: product
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };

export const getSensor = (token, productId) => {
    console.log("API sensor")
    console.log(JSON.stringify({productId}))
    return fetch(`${API}/getSensor/:productId`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:  JSON.stringify({productId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const readSensorRealTime = (token,id) => {
    return fetch(`${API}/realtimeTemp`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:  JSON.stringify({id})
    }
    )
    .then(response => {
        // console.log(response)
        return response.json();
    })
    .catch(err => console.log(err))
}


export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// export const updateProduct = (productId, userId, token, product) => {
//     return fetch(`${API}/product/${productId}/${userId}`, {
//         method: 'PUT',
//         headers: {
//             Accept: 'application/json',
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: product
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };
