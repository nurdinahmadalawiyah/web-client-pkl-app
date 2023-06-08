import { Card, Text, Spacer, Input, Button, Modal, Loading } from "@nextui-org/react";
import React, { useState } from "react";
import { Flex } from "../../styles/flex";
import { User, Lock, InfoCircle } from "react-iconly";
import Link from "next/link";
import axios from "axios";

export const CardLoginProdi = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setShowModal(true);
      return;
    }
    setIsLoading(true)
    try {
      const result = await axios.post(
        `${process.env.API_BASE_URL}/prodi/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
            Accept: "application/json",
          },
        }
      );

      const { data } = result;
      setData(data.data);
      console.log(data.data);
      setLoginError("");
      console.log("Login berhasil", result);

      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('role', data.role);

      window.location.href = "/dashboard-prodi";
    } catch (error) {
      console.error("Login gagal", error);
      setLoginError("Login Gagal, Silahkan Coba Lagi");
      setShowModalError(true);
    }
    setIsLoading(false);
  };

  return (
    <Card
      css={{
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }} justify="center" align="center">
          <Text
            span
            css={{
              fontSize: "48px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login<span style={{ color: "#17C964" }}>.</span>
          </Text>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align="center">
          <Text span css={{ textAlign: "center" }}>
            Silahkan login menggunakan akun prodi anda
          </Text>
        </Flex>
        <Spacer y={1.0} />
        <Input
          contentLeft={<User set="bold" primaryColor="#17C964" />}
          size="lg"
          bordered
          color="success"
          labelPlaceholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <Spacer y={1.6} />
        <Input.Password
          contentLeft={<Lock set="bold" primaryColor="#17C964" />}
          size="lg"
          bordered
          color="success"
          labelPlaceholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Spacer y={2.0} />
        <Button color="success" onClick={handleLogin} disable={isLoading}>
        {isLoading ? <Loading color="currentColor" size="sm" /> : "Login"}
        </Button>
        {loginError && (
          <Modal
            width="500px"
            aria-labelledby="modal-title"
            open={showModalError}
            onClose={() => setShowModalError(false)}
          >
            <Modal.Header>
              <InfoCircle set="bold" primaryColor="red" size={100} />
            </Modal.Header>
            <Modal.Body css={{ textAlign: "center" }}>
              <Text size={20}>{loginError}</Text>
            </Modal.Body>
          </Modal>
        )}
        <Spacer y={1.6} />
        <Flex css={{ gap: "$6", py: "$4" }} justify={"center"}>
          <Link href="/login-akademik" passHref>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              Login Sebagai Akademik
            </a>
          </Link>
        </Flex>
        {showModal && (
          <Modal
            width="500px"
            aria-labelledby="modal-title"
            open={showModal}
            onClose={() => setShowModal(false)}
          >
            <Modal.Header>
              <InfoCircle set="bold" primaryColor="red" size={100} />
            </Modal.Header>
            <Modal.Body css={{ textAlign: "center" }}>
              <Text size={20}>Username dan Password Tidak Boleh Kosong</Text>
            </Modal.Body>
          </Modal>
        )}
      </Card.Body>
    </Card>
  );
};
