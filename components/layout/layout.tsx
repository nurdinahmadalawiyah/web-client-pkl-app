import React from 'react';
import {useLockedBody} from '../hooks/useBodyLock';
import {NavbarWrapper} from '../navbar/navbar';
import {SidebarWrapper} from '../sidebar/sidebar';
import {SidebarContext} from './layout-context';
import {WrapperLayout} from './layout.styles';
import { useRouter } from "next/router";

interface Props {
   children: React.ReactNode;
}

export const Layout = ({children}: Props) => {
   const [sidebarOpen, setSidebarOpen] = React.useState(false);
   const [_, setLocked] = useLockedBody(false);
   const handleToggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      setLocked(!sidebarOpen);
   };
   const router = useRouter();

   const isLoginAkademikPage = router.pathname == "/login-akademik"
   const isLoginProdiPage = router.pathname == "/login-prodi"

   return (
      <SidebarContext.Provider
         value={{
            collapsed: sidebarOpen,
            setCollapsed: handleToggleSidebar,
         }}
      >
         <WrapperLayout>
            {!isLoginAkademikPage && !isLoginProdiPage && <SidebarWrapper />}
            {!isLoginAkademikPage && !isLoginProdiPage && <NavbarWrapper>{children}</NavbarWrapper>}
            {isLoginAkademikPage  && !isLoginProdiPage && children}
            {isLoginProdiPage && children}
         </WrapperLayout>
      </SidebarContext.Provider>
   );
};
