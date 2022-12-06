import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import "../view/styles/reset.css"
import "../view/styles/globals.css";

import Layout from "../view/components/layouts/default";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Layout><Component {...pageProps} /></Layout>;
};

export default trpc.withTRPC(MyApp);
