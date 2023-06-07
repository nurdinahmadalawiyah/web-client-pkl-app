import {
  Input,
  Text,
  Card,
  Spacer,
  Loading,
  Button,
  Tooltip,
  Modal,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import axios from "axios";
import { InfoCircle, TickSquare } from "react-iconly";
import { useRouter } from "next/router";

export const FormEditPembimbing = () => {
  const router = useRouter();
  const { pembimbing } = router.query;
  const [idPembimbing, setIdPembimbing] = useState("");
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namaError, setNamaError] = useState("");
  const [nikError, setNikError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  useEffect(() => {
    if (pembimbing) {
      const parsedPembimbing = JSON.parse(pembimbing);
      setIdPembimbing(parsedPembimbing.id_pembimbing);
      setNama(parsedPembimbing.nama);
      setNik(parsedPembimbing.nik);
      setUsername(parsedPembimbing.username);
    }
  }, [pembimbing]);

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleNikChange = (event) => {
    setNik(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleInput = async () => {
    if (nama === "" || nik === "" || username === "") {
      setNamaError(nama === "" ? "Nama tidak boleh kosong" : "");
      setNikError(nik === "" ? "NIK/NIP tidak boleh kosong" : "");
      setUsernameError(username === "" ? "Username tidak boleh kosong" : "");
    } else if (password !== "" && password.length < 8) {
      setPasswordError("Password minimal harus 8 karakter");
    } else {
      setNamaError("");
      setNikError("");
      setUsernameError("");
      setPasswordError("");

      setIsLoading(true);

      try {
        const result = await axios.post(
          `${process.env.API_BASE_URL}/pembimbing/update/${idPembimbing}?_method=PUT`,
          {
            username,
            nama,
            nik,
            password,
          },
          {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=<calculated when request is sent>",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setShowModalSuccess(true);
      } catch (error) {
        console.error(error);
        setShowModalError(true);
      }
      setIsLoading(false);
    }
  };

  const handleModalSuccess = () => {
    setShowModalSuccess(false);
    router.push("/kelola-pembimbing");
  };

  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Text h3 css={{ ml: 10 }}>
        Edit Data Pembimbing
      </Text>
      <Flex
        css={{
          flexWrap: "wrap",
          "@sm": {
            flexWrap: "nowrap",
          },
        }}
        direction={"row"}
      >
        <Card
          variant="flat"
          css={{
            bg: "transparent",
          }}
        >
          <Card.Body css={{ mw: "400px" }}>
            <Spacer y={0.4} />
            <Input
              size="lg"
              bordered
              color="primary"
              value={nama}
              onChange={handleNamaChange}
              labelPlaceholder="Nama"
            />
            {namaError && <Text color="error">{namaError}</Text>}
            <Spacer y={1.6} />
            <Input
              size="lg"
              bordered
              color="primary"
              value={nik}
              onChange={handleNikChange}
              labelPlaceholder="NIK/NIP"
            />
            {nikError && <Text color="error">{nikError}</Text>}
            <Spacer y={1.6} />
            <Input
              size="lg"
              bordered
              color="primary"
              value={username}
              onChange={handleUsernameChange}
              labelPlaceholder="Username"
            />
            {usernameError && <Text color="error">{usernameError}</Text>}
            <Spacer y={1.6} />
            <Tooltip content={ "Kosongkan Form Passoword jika tidak akan memperbarui password"}>
            <Input.Password
              size="lg"
              bordered
              color="primary"
              value={password}
              onChange={handlePasswordChange}
              labelPlaceholder="Password"
              width="375px"
            />
            </Tooltip>
            {passwordError && <Text color="error">{passwordError}</Text>}
          </Card.Body>
        </Card>
      </Flex>
      <Button auto onPress={handleInput} disabled={isLoading} css={{ ml: 10 }}>
        {isLoading ? <Loading color="currentColor" size="sm" /> : "Simpan"}
      </Button>
      {showModalSuccess && (
        <Modal
          title="Sukses"
          width="500px"
          open={showModalSuccess}
          onClose={handleModalSuccess}
        >
          <Modal.Header>
            <TickSquare set="bold" primaryColor="green" size={100} />
          </Modal.Header>
          <Modal.Body css={{ textAlign: "center" }}>
            <Text size={20}>Data pembimbing berhasil diperbarui.</Text>
          </Modal.Body>
          <Modal.Footer css={{ justifyContent: "center" }}>
            <Button color="primary" onPress={handleModalSuccess}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showModalError && (
        <Modal
          title="Error"
          width="500px"
          open={showModalError}
          onClose={() => setShowModalError(false)}
        >
          <Modal.Header>
            <InfoCircle set="bold" primaryColor="red" size={100} />
          </Modal.Header>
          <Modal.Body css={{ textAlign: "center" }}>
            <Text size={20}>
              Terjadi kesalahan saat memperbarui data pembimbing.
            </Text>
          </Modal.Body>
          <Modal.Footer css={{ justifyContent: "center" }}>
            <Button color="primary" onPress={() => setShowModalError(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Box>
  );
};
