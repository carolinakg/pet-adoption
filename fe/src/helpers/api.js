const baseURL = `http://127.0.0.1:3333`;

//POST
export const postSignup = async (body) => {
  const response = await fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(response);
  return response
};

export const postLogin = async (body) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(response);
  const data = await response.json();
  return data;
};

export const postAddPet = async (body, auth) => {
  const formData = new FormData();
  for (var key in body) {
    formData.append(key, body[key]);
  }
  console.log(formData);
  const response = await fetch(`${baseURL}/pet`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: formData,
  });
  console.log(response);
  const data = await response.json();
  return data;
};

export const postAdoptPet = async (id, auth, typeAdopt) => {
  const response = await fetch(`${baseURL}/pet/${id}/adopt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify({ type_adopt_id: typeAdopt }),
  });
  console.log(response);
  const data = await response.json();
  return data;
};

export const postReturnPet = async (id, auth) => {
  const response = await fetch(`${baseURL}/pet/${id}/return`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });
  console.log(response);
  const data = await response.json();
  return data;
};

export const postSavePet = async (id, auth) => {
  const response = await fetch(`${baseURL}/pet/${id}/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  console.log(response);
  const data = await response.json();
  return data;
};

export const postMakeAdmin = async (id, auth) => {
  const response = await fetch(`${baseURL}/user/${id}/makeadmin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  });
  console.log(response);
};

//GET

export const getPetById = async (id) => {
  try {
    const response = await fetch(`${baseURL}/pet/${id}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const getPets = async () => {
  try {
    const response = await fetch(`${baseURL}/pet`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const searchPets = async (type, name, height, weight, status) => {
  let link = `${baseURL}/pet?`
  if(type){
    link += `type=${type}`
  } if(name){
    if(link[link.length-1] === "?"){
      link += `name=${name}`
    } else{
      link += `&name=${name}`
    }
  }
  if(height){
    if(link[link.length-1] === "?"){
      link += `height=${height}`
    } else{
      link += `&height=${height}`
    }
  }
  if(weight){
    if(link[link.length-1] === "?"){
      link += `weight=${weight}`
    } else{
      link += `&weight=${weight}`
    }
  }
  if(status > 0){
    if(link[link.length-1] === "?"){
      link += `adopt_status_id=${status}`
    } else{
      link += `&adopt_status_id=${status}`
    }
  }
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPetByUserId = async (id) => {
  try {
    const response = await fetch(`${baseURL}/pet/user/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${baseURL}/user/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByIdFull = async (id) => {
  try {
    const response = await fetch(`${baseURL}/user/${id}/full`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const usersAPI = async (auth) => {
  const response = await fetch(`${baseURL}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  console.log(response);
  const data = response.json();
  return data;
};

export const getUserId = async (auth) => {
  const response = await fetch(`${baseURL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  console.log(response);
  const data = response.json();
  return data;
};

//PUT

// export const editPet = async (id, body, auth) => {
//   const response = await fetch(`${baseURL}/pet/${id}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${auth}`,
//     },
//     body: JSON.stringify(body),
//   });
//   console.log(response);
// };

export const editPet = async (body, auth, id) => {
  const formData = new FormData();
  for (var key in body) {
    formData.append(key, body[key]);
  }
  console.log(id);
  // console.log(formData);
  const response = await fetch(`${baseURL}/pet/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: formData,
  });
  console.log(response);
  const data = await response.json();
  return data;
};



export const editUserProfile = async (body, auth) => {
  const response = await fetch(`${baseURL}/user`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify(body),
  });
  console.log(response);
};

//DELETE

export const postDeletePet = async (id, auth) => {
  const response = await fetch(`${baseURL}/pet/${id}/save`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  console.log(response);
};
