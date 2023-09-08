import {
  Input,
  Text,
  Card,
  Spacer,
  Button,
  Loading,
  Modal,
  Grid,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import axios from "axios";
import { useRouter } from "next/router";
import { InfoCircle, TickSquare } from "react-iconly";
import { DropdownInput } from "./dropdown-input";

export const FormInputMahasiswa = () => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("Pilih Prodi");
  const [tahunMasuk, setTahunMasuk] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namaError, setNamaError] = useState("");
  const [nimError, setNimError] = useState("");
  const [prodiError, setProdiError] = useState("");
  const [tahunMasukError, setTahunMasukError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleNimChange = (event) => {
    setNim(event.target.value);
  };

  const handleProdiChange = React.useMemo(
    () => Array.from(prodi).join("").replaceAll("_", " "),
    [prodi]
  );

  const handleNomorHpChange = (event) => {
    setNomorHp(event.target.value);
  };

  const handleTahunMasukChange = (event) => {
    setTahunMasuk(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleInput = async () => {
    if (
      nama === "" ||
      nim === "" ||
      prodi === "Pilih Prodi" ||
      tahunMasuk === "" ||
      username === "" ||
      password === ""
    ) {
      setNamaError(nama === "" ? "Nama tidak boleh kosong" : "");
      setNimError(nim === "" ? "NIM tidak boleh kosong" : "");
      setProdiError(prodi === "Pilih Prodi" ? "Silakan pilih Prodi" : "");
      setTahunMasukError(
        tahunMasuk === "" ? "Tahun Masuk tidak boleh kosong" : ""
      );
      setUsernameError(username === "" ? "Username tidak boleh kosong" : "");
      setPasswordError(username === "" ? "Password tidak boleh kosong" : "");
    } else if (password !== "" && password.length < 8) {
      setPasswordError("Password minimal harus 8 karakter");
    } else {
      setNamaError("");
      setNimError("");
      setProdiError("");
      setTahunMasukError("");
      setUsernameError("");
      setPasswordError("");

      setIsLoading(true);

      try {
        const result = await axios.post(
          `${process.env.API_BASE_URL}/mahasiswa/add`,
          {
            username,
            nama,
            nim,
            prodi: handleProdiChange,
            tahun_masuk: tahunMasuk,
            email,
            nomor_hp: nomorHp,
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
    router.push("/kelola-mahasiswa");
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
        Tambah Data Mahasiswa
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
          <Card.Body>
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
              value={nim}
              onChange={handleNimChange}
              labelPlaceholder="NIM"
            />
            {nimError && <Text color="error">{nimError}</Text>}
            <Spacer y={1.6} />
            <Input
              size="lg"
              bordered
              color="primary"
              type="number"
              value={nomorHp}
              onChange={handleNomorHpChange}
              labelPlaceholder="Nomor HP"
            />
            <Spacer y={1.6} />
            <Grid.Container>
              <Grid xs={6}>
              <DropdownInput
                prodi={prodi}
                setProdi={setProdi}
                handleProdiChange={handleProdiChange}
              />
              </Grid>
              <Grid xs={6}>
              <Input
                size="lg"
                bordered
                color="primary"
                type="number"
                value={tahunMasuk}
                onChange={handleTahunMasukChange}
                labelPlaceholder="Tahun Masuk"
              />
              </Grid>
            </Grid.Container>
            <Grid.Container>
              <Grid xs={6}>
                {prodiError && <Text color="error">{prodiError}</Text>}
              </Grid>
              <Grid xs={6}>
                {tahunMasukError && <Text color="error">{tahunMasukError}</Text>}
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
        <Card
          variant="flat"
          css={{
            bg: "transparent",
          }}
        >
          <Card.Body>
            <Spacer y={0.4} />
            <Input
              size="lg"
              bordered
              color="primary"
              value={email}
              onChange={handleEmailChange}
              labelPlaceholder="Email"
            />
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
            <Input.Password
              size="lg"
              bordered
              color="primary"
              value={password}
              onChange={handlePasswordChange}
              labelPlaceholder="Password"
            />
            {passwordError && <Text color="error">{passwordError}</Text>}
          </Card.Body>
        </Card>
      </Flex>
      <Spacer y={1.6} />
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
            <Text size={20}>Data mahasiswa berhasil disimpan.</Text>
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
              Terjadi kesalahan saat menyimpan data mahasiswa.
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
