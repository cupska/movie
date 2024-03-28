import axios from "axios";
import { useEffect, useState } from "react";

const useList = ({
  getUrl,
  defaultOpt,
}: {
  getUrl: (opt?: string) => string;
  defaultOpt?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<{ results: any[] }>();
  const [selectedOpts, setSelectedOpts] = useState(defaultOpt);
  console.log(selectedOpts);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(getUrl(selectedOpts));
      setData(res.data);
    };
    getData();
  }, [selectedOpts]);

  return { data: data, setSelectedOpts };
};

export { useList };
