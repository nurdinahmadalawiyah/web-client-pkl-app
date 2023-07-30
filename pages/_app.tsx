import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Layout } from "../components/layout/layout";
import { useEffect, useState } from "react";
import OneSignalReact from "react-onesignal";
import axios from "axios";

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
      axios
        .post(
          `${process.env.API_BASE_URL}/akademik/save-player-id/?_method=PUT`,
          {
            notification_id: playerId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Player ID berhasil disimpan:", response.data);
        })
        .catch((error) => {
          console.error("Error saat menyimpan Player ID:", error);
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
