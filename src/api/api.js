import { genericApiCall } from "../helpers/api";

// export all api calls from here
export const fetchCartData = async () => {
  const url = `cart`;
  return await genericApiCall({ url, method: "GET" });
};

export const fetchProductsData=async(page,pageSize)=>{
  const url=`products?_page=${page + 1}&_limit=${pageSize}`
  return await genericApiCall({url,method:'GET'})
}
