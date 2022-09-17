import useSWR from "swr";
import { HouseKeep, HouseKeepTable } from "../utils/types";
import { del, fetcher, post, put } from "./APIUtils";

type postHouseKeepProps = {
  user_id: string;
} & Omit<HouseKeep, "id">;

type putHouseKeepProps = {
  user_id: string;
} & HouseKeep;

type postHouseKeepResult = {
  data: HouseKeep;
  isError: boolean;
};

export const useGetHouseKeeps = (user_id: string) => {
  const { data, error, isValidating } = useSWR<HouseKeep[]>(
    `/housekeeps/${user_id}`,
    fetcher
  );

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

export const postHouseKeep = async ({
  name,
  value,
  is_prepared,
  table_id,
  table_name,
  user_id,
}: postHouseKeepProps): Promise<postHouseKeepResult> => {
  const { status, data } = await post(`/housekeep-columns/${user_id}`, {
    name,
    value,
    is_prepared,
    table_id,
    table_name,
  });

  return {
    data: data,
    isError: status != 200,
  };
};

export const updateHouseKeep = async ({
  id,
  name,
  value,
  is_prepared,
  table_id,
  table_name,
  user_id,
}: putHouseKeepProps): Promise<postHouseKeepResult> => {
  const { status, data } = await put(`/housekeep-columns/${user_id}`, {
    id,
    name,
    value,
    is_prepared,
    table_id,
    table_name,
  });

  return {
    data: data,
    isError: status != 200,
  };
};

export const deleteHouseKeep = async ({
  id,
  name,
  value,
  is_prepared,
  table_id,
  table_name,
  user_id,
}: putHouseKeepProps): Promise<postHouseKeepResult> => {
  const { status, data } = await del(`/housekeep-columns/${user_id}`, {
    id,
    name,
    value,
    is_prepared,
    table_id,
    table_name,
  });

  return {
    data: data,
    isError: status != 200,
  };
};
