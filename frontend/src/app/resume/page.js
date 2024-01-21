
import { useRouter } from "next/navigation";
import UserResumes from "@/components/Pages/resumelist/Resumes";
import { serverMethod } from "@/lib/serverMethod";
const Page = async (props) => {

  const { params, searchParams } = props
  const list = await fetchResumes(searchParams)

  return (
    <div className=" py-10">
      <UserResumes data={list} />

    </div>
  );
};

export default Page;


export const fetchResumes = async (query) => {

  const param = {
    method: "get",
    header: {},
    query: { ...query, select_keys: ['position', 'phone', 'email', 'updatedAt', 'image'] }
  }
  const result = await serverMethod(`/resumes`, param)
  return result
}