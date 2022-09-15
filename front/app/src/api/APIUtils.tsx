export const fetcher = (path: String): Promise<any> =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}` + path).then((res) =>
    res.json()
  );
