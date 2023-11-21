import { genericApiCall } from "../helpers/api";
import axios from "axios";

export const fetchProducts = async (page, pageSize) => {
  const url = `products?_page=${page + 1}&_limit=${pageSize}`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};

export const fetchCartData = async (page, pageSize) => {
  const url = `cart?_page=${page + 1}&_limit=${pageSize}`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};

export const fetchCartProductWithName = async (prodName) => {
  const url = `cart?name=${prodName}`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};
export const fetchProductWithId = async (id) => {
  const url = `products/${id}`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};
export const editProductWithId = async (id, product) => {
  const url = `products/${id}`;
  return await genericApiCall({
    method: "PATCH",
    url,
    data: product,
  });
};

export const addProductInCart = async (product) => {
  const url = `cart`;
  return await genericApiCall({
    method: "POST",
    url,
    data: product,
  });
};

export const users_Fetch = async () => {
  const url = "users";
  return await genericApiCall({
    method: "GET",
    url,
  });
};

export const fetchUsersPageData = async (payload) => {
  payload.page = payload.page + 1;
  const url = `users?_page=${payload.page}&_limit=${payload.pageSize}&q=${payload.searchText}`;
  console.log("url", url);
  return await genericApiCall({
    method: "GET",
    url,
  });
};

export const addUser_UsersPage = async (payload) => {
  const url = "users";
  return await genericApiCall({
    method: "POST",
    url,
    data: payload,
  });
};

export const editUser_usersPage = async (payload) => {
  const url = `users/${payload.id}`;
  return await genericApiCall({
    method: "PATCH",
    url,
    data: payload,
  });
};

export const deleteUser_api = async (payload) => {
  const url = `users/${payload}`;
  return await genericApiCall({
    method: "DELETE",
    url,
  });
};

export const deleteUsersListRecord = async (payload) => {
  const url = `users/${payload}`;
  return await genericApiCall({
    method: 'DELETE',
    url,
    data: payload
  });
};

export const fetchTestDataUsername = async () => {
  const url = `sampleData`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};

export const fetchTestData = async (payload) => {
  payload.page = payload.page + 1;
  const url = `sampleData?_page=${payload.page}&_limit=${payload.pageSize}&q=${payload.searchText}`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};
export const addTestData = async (payload) => {
  const url = `sampleData`;
  return await genericApiCall({
    method: "POST",
    url,
    data: payload,
  });
};
export const editTestData = async (payload) => {
  const url = `sampleData/${payload.id}`;
  return await genericApiCall({
    method: "PATCH",
    url,
    data: payload,
  });
};

export const deleteListTestData = async (payload) => {
  const url = `sampleData/${payload}`;
  return await genericApiCall({
    method: "DELETE",
    url,
    data: payload,
  });
};

export const searchUsersPage_api = async (text, page, pageSize) => {
  const url = `users?q=${text}&_page=${page}&_limit=${pageSize}`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};
export const fetchUsers = async () => {
  const url = `users`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};

export const getAutoCompleteOptions = async () => {
  const url = `itemdata`;
  return await genericApiCall({
    method: "GET",
    url,
  });
};

export const updatePermission = async (payload) => {
  const url = `users/${payload.id}`;
  return await genericApiCall({
    method: "PATCH",
    url,
    data: payload,
  });
};

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

export const HandleOrgPatchData = async ({ id, obj }) => {
  console.log(id, obj, "bsldfladsj");
  let url = `Metadata/${id}`;
  // return await genericApiCall({
  //   url,method:"PATCH",data:data
  // })
};

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

export const OrgContextRequest = () => {
  let url = "Metadata";
  return genericApiCall({
    url,
    method: "GET",
  });
};

export const ShoaibAddOrganizationFunc = async (formdata) => {
  console.log(formdata, "formdata");

  let url = `Metadata`;
  return await genericApiCall({
    url,
    method: "POST",
    data: formdata,
  });
};
export const getInspectRepairListAPI = async ({ page, pageSize }) => {
  const url = `streaming/csv-preprocess/status?page=${page}&pageSize=${pageSize}`;
  return await apiCallBackendCatalog("catalog", {
    method: "GET",
    url,
  });
};



{/****************Film DashBoard API *****************/}

export const getFilmDataAPI = async () =>{
  const url= `https://swapi.dev/api/films/`;
  const response = await axios.get(url)
  console.log("films",response)
   return response
  // return await genericApiCall({
  //   method: "GET",
  //   url,
  // });
}

export const getPeopleDataAPI = async()=>{
  const url =`https://swapi.dev/api/people/`;
  const response = await axios.get(url);
  console.log("people",response)
  return response
}

export const getPlanetDataAPI = async()=>{
  const url = `https://swapi.dev/api/planets/`;
  const response = await axios.get(url);
  console.log("planetsapi",response)
  return response
}

export const getSpeciesDataAPI = async()=>{
  const url = `https://swapi.dev/api/species/`;
  const response = await axios.get(url);
  console.log("planetsapi",response)
  return response
}
export const getStarshipsDataAPI = async()=>{
  const url = `https://swapi.dev/api/starships`;
  const response = await axios.get(url);
  console.log("starshipapi",response)
  return response
}

export const getVehiclesDataAPI = async()=>{
  const url = `https://swapi.dev/api/vehicles`;
  const response = await axios.get(url);
  console.log("vehicleapi",response);
  return response
}