import axios from "axios";

export async function genericApiCall(payload) {
  let response = null;
  let error = null;

  const PROTOCOL = "http";
  const HOST = 'localhost:3000';
  const urlPath = `${PROTOCOL}://${HOST}/`;

  payload.url = urlPath + payload.url;

  try {
    response = await axios(payload);
  } catch (e) {
    console.log(e);
  }
  return { response, error };
}
