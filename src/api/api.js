
import { genericApiCall} from "../helpers/api";

  export const fetchTestData=async(payload)=>{
    payload.page=payload.page+1
     const url=`sampleData?_page=${payload.page}&_limit=${payload.pageSize}&q=${payload.searchText}`;
    return await genericApiCall({
        method: 'GET',
        url
      },
      );
   }
   export const addTestData = async (payload) => {
    const url = `sampleData`;
    return await genericApiCall({
      method: 'POST',
      url,
      data: payload
    });
  };
  export const editTestData = async (payload) => {
    const url = `sampleData/${payload.id}`;
    return await genericApiCall({
      method: 'PATCH',
      url,
      data: payload
    });
  };
  
  export const deleteListTestData = async (payload) => {
    const url = `sampleData/${payload}`;
    return await genericApiCall({
      method: 'DELETE',
      url,
      data: payload
    });
  };
  export const fetchUsers = async () => {
    const url = `users`;
    return await genericApiCall({
      method: 'GET',
      url
    });
  };

  export const getAutoCompleteOptions = async () => {
    const url = `itemdata`;
    return await genericApiCall({
      method: 'GET',
      url
    });
  };

  export const updatePermission = async (payload) => {
    const url = `users/${payload.id}`;
    return await genericApiCall({
      method: 'PATCH',
      url,
      data: payload
    });
  };