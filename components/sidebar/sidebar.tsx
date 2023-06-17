import React, { useState, useEffect } from "react";
import { Box } from "../styles/box";
import { Sidebar } from "./sidebar.styles";
import { Flex } from "../styles/flex";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { useRouter } from "next/router";
import { Text } from "@nextui-org/react";
import { SidebarItemProdi } from "./sidebar-item-prodi";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [showMenuAkademik, setShowMenuAkdemik] = useState(false);
  const [showMenuProdi, setShowMenuProdi] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role === "Akademik") {
      setShowMenuAkdemik(true);
    } else if (!accessToken || role === "Prodi") {
      setShowMenuProdi(true);
    }
  }, []);

  return (
    <Box
      as="aside"
      css={{
        height: "100vh",
        zIndex: 202,
        position: "sticky",
        top: "0",
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header>
          <Text
            h3
            size={"$xl"}
            weight={"bold"}
            css={{
              m: 0,
              color: "$accents9",
              lineHeight: "$lg",
              mb: "-$5",
            }}
          >
            PKL TEDC
          </Text>
        </Sidebar.Header>
        <Flex direction={"column"} justify={"between"} css={{ height: "100%" }}>
          <Sidebar.Body className="body sidebar">
            <SidebarMenu title="">
              {showMenuAkademik && (
                <>
                  <SidebarItem
                    title="Dashboard"
                    icon={undefined}
                    isActive={
                      router.pathname === "/dashboard-akademik" ||
                      router.pathname == "/"
                    }
                    href="dashboard-akademik"
                  />
                  <SidebarItem
                    title="Pengajuan PKL"
                    icon={undefined}
                    isActive={
                      router.pathname === "/pengajuan-pkl" ||
                      router.pathname === "/detail-pengajuan-pkl"
                    }
                    href="pengajuan-pkl"
                  />
                  <CollapseItems
                    icon={undefined}
                    items={[
                      // eslint-disable-next-line react/jsx-key
                      <SidebarItem
                        title="Mahasiswa"
                        icon={undefined}
                        isActive={
                          router.pathname === "/kelola-mahasiswa" ||
                          router.pathname === "/tambah-mahasiswa" ||
                          router.pathname === "/edit-mahasiswa"
                        }
                        href="/kelola-mahasiswa"
                      />,
                      // eslint-disable-next-line react/jsx-key
                      <SidebarItem
                        title="Pembimbing"
                        icon={undefined}
                        isActive={
                          router.pathname === "/kelola-pembimbing" ||
                          router.pathname === "/tambah-pembimbing" ||
                          router.pathname === "/edit-pembimbing"
                        }
                        href="/kelola-pembimbing"
                      />,
                    ]}
                    title="Kelola User"
                  />
                </>
              )}
            </SidebarMenu>

            <SidebarMenu title="">
              {showMenuProdi && (
                <>
                  <SidebarItemProdi
                    title="Dashboard"
                    icon={undefined}
                    isActive={
                      router.pathname === "/dashboard-prodi" ||
                      router.pathname == "/"
                    }
                    href="dashboard-prodi"
                  />
                  <SidebarItemProdi
                    title="Data PKL Mahasiswa"
                    icon={undefined}
                    isActive={
                      router.pathname === "/data-pkl-mahasiswa" ||
                      router.pathname === "/detail-data-pkl-mahasiswa" ||
                      router.pathname === "/biodata-industri" ||
                      router.pathname === "/jurnal-kegiatan" ||
                      router.pathname === "/detail-jurnal-kegiatan" ||
                      router.pathname === "/daftar-hadir" ||
                      router.pathname === "/detail-nilai-pkl" ||
                      router.pathname === "/edit-nilai"
                    }
                    href="data-pkl-mahasiswa"
                  />
                  <SidebarItemProdi
                    title="Lowongan PKL"
                    icon={undefined}
                    isActive={
                      router.pathname === "/lowongan-pkl" ||
                      router.pathname === "/tambah-lowongan-pkl" ||
                      router.pathname === "/edit-lowongan-pkl"
                    }
                    href="lowongan-pkl"
                  />
                </>
              )}
            </SidebarMenu>
            {/* <SidebarMenu title="Main Menu">
              <SidebarItem
                title="Home"
                icon={<HomeIcon />}
                isActive={router.pathname === "/"}
                href="/"
              />
              <SidebarItem
                isActive={router.pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={router.pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />

              <SidebarItem
                isActive={router.pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu> */}

            {/* <SidebarMenu title="General">
              <SidebarItem
                isActive={router.pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu> */}

            {/* <SidebarMenu title="Updates">
              <SidebarItem
                isActive={router.pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </Sidebar.Body>
        </Flex>
      </Sidebar>
    </Box>
  );
};
