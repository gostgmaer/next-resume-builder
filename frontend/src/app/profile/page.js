

import Personal from "@/components/Pages/profile/profile";
import { serverMethod } from "@/lib/serverMethod";

import { cookies } from 'next/headers'
export default async function Profile(props) {


const requestData= await fetchCurrentProfile()


  return (
    <div>
      <Personal data={requestData} />
    </div>
  );
}

export const fetchCurrentProfile = async () => {

  const cookieStore = cookies()
  const tokendata = "Bearer " + cookieStore.get("headerPayload").value + "." + cookieStore.get("signature").value;
  const param = {
    method: "get",
    header: {
      Authorization: tokendata,
    },
  }
  const result = await serverMethod(`/authentication/user/current/profile`, param)
  return result
}