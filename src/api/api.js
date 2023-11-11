// export all api calls from here
import { genericApiCall } from "../helpers/api";

export const users_Fetch = async() =>{
  const url ='users';
  return await genericApiCall({
    method:'GET',
    url,
  }) 
}

export const addUser_UsersPage = async(payload) =>{
      const url = "users";
      return await genericApiCall({
        method:'POST',
        url,
        data:payload
      })
}

export const editUser_usersPage = async (payload) =>{
   const url = `users/${payload.id}`
   return await genericApiCall({
    method:'PATCH',
    url,
    data:payload
   })
}

export const deleteUser_api =async(payload) =>{
  const url=`users/${payload}`;
  return await genericApiCall({
    method:'DELETE',
    url
  })
}