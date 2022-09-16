import { NextPage } from "next";
import Error from "next/error";
interface Props {
  statusCode?: number;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  return statusCode ? (
    <Error statusCode={statusCode}></Error>
  ) : (
    <p>An error occurred on client</p>
  );
};

export default ErrorPage;
