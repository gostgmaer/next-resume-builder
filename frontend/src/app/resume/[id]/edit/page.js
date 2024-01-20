import ResumeBlock from "@/components/Builder/FormElement";
import { serverMethod } from "@/lib/serverMethod";

const Page = async(props) => {

  // console.log(props);
  const request = await fetchSingleResume(props.params.id)
  // console.log("request",request);

  return (
    <div className=" py-10">
      <ResumeBlock data={request} />

    </div>
  );
};

export default Page;

export const fetchSingleResume = async (id)=>{

  const param ={
    method: "get",
    header: {},
  }
  const result = await serverMethod(`/resumes/${id}`,param)
  return result
}