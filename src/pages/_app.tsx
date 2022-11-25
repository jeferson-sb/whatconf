import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../view/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
