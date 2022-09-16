import type { NextPage } from "next";
import LoggedInTop from "../src/components/top/LoggedInTop";
import LoggedOutTop from "../src/components/top/LoggedOutTop";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return session && session.user ? <LoggedInTop /> : <LoggedOutTop />;
};

export default Home;
