// const api = "http://127.0.0.1:3000/api/1";
const site = "127.0.0.1:3000/";

const api = "api/1";

export async function getBoard() {
  const req = await axios.get(site + api);
  return req;
}
