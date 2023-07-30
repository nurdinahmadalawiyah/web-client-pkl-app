import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Layout} from '../components/layout/layout';
import { useEffect } from 'react';

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

function MyApp({Component, pageProps}: AppProps) {
   useEffect(() => {
      if (typeof window !== undefined) {
         window.OneSignal = window.OneSignal || [];
         OneSignal.push(function () {
            OneSignal.init({
               appId: "87cf8313-c7f7-420a-b2dd-fbf5a3e29513",
               notifyButton: {
                  enable: true,
               },
            });
         });
      }

      return () => {
         window.OneSignal = undefined;
      };
   }, []);

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
