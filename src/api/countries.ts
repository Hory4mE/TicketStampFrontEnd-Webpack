import axios from "axios";

export async function getAllCountry(): Promise<any> {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  const result = await axios.get(
    "https://restcountries.com/v3.1/all?fields=altSpellings,flags"
  );
  return result.data;
}
export async function editCountry(data: any) {
  await axios.patch(
    "https://restcountries.com/v3.1/all?fields=altSpellings,flags"
  );
}
