import { NcButton } from "@nipacloud/nc-design-system-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { editCountry, getAllCountry } from "../api/countries";
import { queryclient } from "../queryClient";

const About: FC = () => {
  // const [num, setNum] = useState<number>(0);
  const { isLoading, isSuccess, isError, data, refetch } = useQuery({
    queryKey: ["allCountries"],
    queryFn: getAllCountry,
    enabled: false,
  });
  const updateMutation = useMutation({
    mutationKey: ["updatemuta"],
    mutationFn: editCountry,
  });
  const handleupdate = async () => {
    await updateMutation.mutateAsync({});
    queryclient.invalidateQueries({
      queryKey: ["allCountries"],
    });
  };
  if (isLoading || isError) {
    return (
      <div className="text-6xl text-red-800 flex w-screen justify-center items-center text-center">
        <NcButton type="text" loading>
          Text
        </NcButton>{" "}
        {isError && "Error occurred, please try again."}
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center space-x-10 my-5 ">
        <div className="px-5 py-2 bg-blue-500 rounded-lg">
          <button className="text-xl font-bold" onClick={() => refetch()}>
            refetch
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[16px]">
        {data &&
          data.map((item: any) => (
            <div className="flex flex-col gap-[8px] items-center">
              <img
                src={item.flags.svg}
                className="max-w-[50px] rounded-[8px]"
              />
              <div>{item.altSpellings[item.altSpellings.length - 1]}</div>
            </div>
          ))}
      </div>
    </>
  );
};
export default About;
