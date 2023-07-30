import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Layout } from "../components/layout/layout";
import { useEffect, useState } from "react";
import OneSignalReact from "react-onesignal";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    OneSignalReact.init({
      appId: "87cf8313-c7f7-420a-b2dd-fbf5a3e29513",
      notifyButton: {
        enable: true,
      },
    });

    OneSignalReact.on("subscriptionChange", (isSubscribed: boolean) => {
      if (isSubscribed) {
        OneSignalReact.getUserId().then((userId?: string | null) => {
          if (userId) {
            setPlayerId(userId);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
   if (playerId) {
     const data = { notification_id: playerId };
     fetch(`${process.env.API_BASE_URL}/save-player-id/?_method=PUT`, {
       method: "POST",
       body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json",
       },
     });
   }
 }, [playerId]);

  return (
    <NextThemesProvider
      defaultTheme="light"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
