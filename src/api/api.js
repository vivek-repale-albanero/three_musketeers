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


export const HandleOrgPatchData=async({id,obj})=>{
  console.log(id,obj,"bsldfladsj")
  let url=`Metadata/${id}`
  // return await genericApiCall({
  //   url,method:"PATCH",data:data
  // })
}


export const ShoaibReloadFetchResultsFunc = async ({
  page,
  pageSize,
  searchText,
}) => {
  let url = `Metadata?q=${searchText}&_page=${page}&_limit=${pageSize}`;
  return await genericApiCall({
    url,
    method: "GET",
  });
};

export const OrgContextRequest =()=>{
  let url = 'Metadata'
  return genericApiCall({
    url,method:"GET"
  })
}

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
