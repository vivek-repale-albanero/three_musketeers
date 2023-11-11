
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
// export all api calls from here

import { MultipleDeleteRecords, genericApiCall } from "../helpers/api";


export const fetchOrgData = async ({ page, pageSize }) => {
  let url = `Metadata?_page=${page}&_limit=${pageSize}`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};



export const DeleteSingleOrgData = async ({ id }) => {
  let url = `Metadata/${id}`;
  return await genericApiCall({
    url,
    method: "DELETE",
  });
};



export const MultiDeleteRecordsFunc = async (id) => {
  let url = `Metadata/${id}`;
  return await genericApiCall({
    url,
    method: "DELETE",
  });
};



export const fetchSearchResultsFunc = async ({
  searchText,
  page,
  pageSize,
}) => {
  let url = `Metadata?q=${searchText}&_page=${page}&_limit=${pageSize}`;
  return await genericApiCall({
    url,
    method: "GET",
  });
};



export const ShoaibReloadFetchResultsFunc = async ({
  page,
  pageSize,
  searchText,
}) => {
  let url = `Metadata?q=${searchText}`;
  return await genericApiCall({
    url,
    method: "GET",
  });
};

export const ShoaibAddOrganizationFunc = async (formdata) => {

  console.log(formdata,"formdata")

  let url=`Metadata`
  return await genericApiCall({
    url,
    method:"POST",
    data:formdata
  })


};
export const getInspectRepairListAPI = async ({ page, pageSize }) => {
  const url = `streaming/csv-preprocess/status?page=${page}&pageSize=${pageSize}`;
  return await apiCallBackendCatalog("catalog", {
    method: "GET",
    url,
  });
};
