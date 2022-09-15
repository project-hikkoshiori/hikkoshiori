const postRequestOptionsBase: RequestInit = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export const fetcher = (path: String): Promise<any> =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}` + path).then((res) =>
    res.json()
  );

export const post = async (path: String, body: object): Promise<any> => {
  const requestOptions: RequestInit = {
    ...postRequestOptionsBase,
    body: JSON.stringify(body),
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}` + path,
    requestOptions
  );

  return {
    status: res.status,
    data: await res.json(),
  };
};