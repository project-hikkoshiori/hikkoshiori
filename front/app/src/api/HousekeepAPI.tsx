import useSWR from "swr";
import { HouseKeep, HouseKeepTable } from "../utils/types";
import { fetcher } from "./APIUtils";

export const useGetHouseKeeps = (user_id: string) => {
  const { data, error, isValidating } = useSWR<HouseKeep[]>(
    `/housekeeps/${user_id}`,
    fetcher
  );

  console.log(data, !data && !error, error, isValidating);

  const structuredData: HouseKeepTable[] = [];

  if (data != undefined) {
    data.forEach((housekeep) => {
      const table_index = structuredData.findIndex(
        (table) => table.id == housekeep.table_id
      );
      if (table_index >= 0) {
        structuredData[table_index].data.push(housekeep);
      } else {
        structuredData.push({
          id: housekeep.table_id,
          name: housekeep.table_name,
          data: [housekeep],
        });
      }
    });
  }

  return {
    data: !data ? data : structuredData,
    isLoading: !data && !error,
    isError: !!error,
    error: error,
  };
};
