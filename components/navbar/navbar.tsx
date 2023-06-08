import { Link, Navbar, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { UserDropdownProdi } from "./user-dropdown-prodi";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const [showUserDropdownAkdemik, setShowUserDropdownAkdemik] = useState(false);
  const [showShowUserDropdownProdi, setShowUserDropdownProdi] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role === "Akademik") {
      setShowUserDropdownAkdemik(true);
    } else if (!accessToken || role === "Prodi") {
      setShowUserDropdownProdi(true);
    }
  }, []);

  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <Box
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Navbar
        isBordered
        css={{
          borderBottom: "1px solid $border",
          justifyContent: "space-between",
          width: "100%",
          "@md": {
            justifyContent: "space-between",
          },

          "& .nextui-navbar-container": {
            border: "none",
            maxWidth: "100%",

            gap: "$6",
            "@md": {
              justifyContent: "space-between",
            },
          },
        }}
      >
        <Navbar.Content showIn="md">
          <BurguerButton />
        </Navbar.Content>
        <Navbar.Content
          hideIn={"md"}
          css={{
            width: "100%",
          }}
        ></Navbar.Content>
        <Navbar.Content>
          <Navbar.Content>
            {showUserDropdownAkdemik && <UserDropdown />}
            {showShowUserDropdownProdi && <UserDropdownProdi />}
          </Navbar.Content>
        </Navbar.Content>

        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      {children}
    </Box>
  );
};
