
import Personal from "@/components/Pages/profile/profile";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";

import { useRouter } from "next/navigation";
import React, {  } from "react";

const Profile = () => {
  // @ts-ignore
  // const { user, userId } = useAuthContext();
  // const { loading } = useGlobalAppContext();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!userId) router.push("/auth/login");
  // }, [userId?.user_id]);
  return <Personal />;
};

export default Profile;


export const getServerSideProps = async (ctx) => {

console.log(ctx);
  return {
    props:{
      data:null
    }
  }
}
