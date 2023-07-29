import { Avatar, Dropdown, Navbar, Text, Modal, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import axios from "axios";
import { User } from "react-iconly";
import { InfoCircle } from "react-iconly";

export const UserDropdown = () => {
  const [userRole, setUserRole] = useState("");
  const [userToken, setUserToken] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("accessToken");
    setUserRole(role || "");
    setUserToken(token || "");
  }, []);

  const handleLogout = () => {
    setShowConfirmationModal(true);
  };

  const confirmLogout = async () => {
    try {
      await axios.post(`${process.env.API_BASE_URL}/akademik/logout`, null, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      localStorage.removeItem("role");
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.error("Logout error:", error);
    }
    window.location.href = "/login-akademik";
  };

  const cancelLogout = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
            <Avatar bordered as="button" size="md" icon={<User set="bold" />} />
          </Dropdown.Trigger>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          onAction={(actionKey) => console.log({ actionKey })}
        >
          <Dropdown.Item key="profile" css={{ height: "$18" }}>
            <Text b color="inherit" css={{ d: "flex" }}>
              Anda Login Sebagai
            </Text>
            <Text b color="inherit" css={{ d: "flex" }}>
              {userRole}
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="logout" withDivider color="error">
            <Text b color="inherit" css={{ d: "flex" }} onClick={handleLogout}>
              Logout
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="switch" withDivider>
            <DarkModeSwitch />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal
            width="500px"
            aria-labelledby="modal-title"
            open={showConfirmationModal}
            onClose={cancelLogout}
          >
            <Modal.Header>
              <InfoCircle set="bold" primaryColor="orange" size={100} />
            </Modal.Header>
            <Modal.Body css={{ textAlign: "center" }}>
              <Text size={20}>Anda Yakin Ingin Logout?</Text>
            </Modal.Body>
            <Modal.Footer css={{justifyContent: "center"}}>
            <Button onClick={confirmLogout} color="error">
              Ya
            </Button>
            <Button onClick={cancelLogout}>
              Tidak
            </Button>
          </Modal.Footer>
          </Modal>
    </>
  );
};
