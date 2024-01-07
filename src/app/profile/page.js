// @ts-nocheck
"use client";
import Personal from "@/components/Pages/profile/profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Profile({ data }) {

  const { data: session } = useSession()


  // const [axios, spinner] = useAxios();
  // const { user, userId } = useAuthContext();
  // // const { loader } = useGlobalAppContext();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) router.push("/auth/signin");
  // }, [session]);

  // if (!session) {
  //   router.push("/auth/signin");
  // }

  return (
    <div>
      <Personal />
    </div>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const data = await res.json()
//   return { props: { data } }
// }
