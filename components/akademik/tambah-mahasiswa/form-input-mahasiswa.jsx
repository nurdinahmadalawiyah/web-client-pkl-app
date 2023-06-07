import {
  Input,
  Text,
  Card,
  Spacer,
  Dropdown,
  Row,
  Button,
  Loading,
  Modal,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import { ChevronDown } from "react-iconly";
import axios from "axios";

export const FormInputMahasiswa = () => {
  const [data, setData] = useState();
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [semester, setSemester] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namaError, setNamaError] = useState("");
  const [nimError, setNimError] = useState("");
  const [prodiError, setProdiError] = useState("");
  const [semesterError, setSemesterError] = useState("");
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

  const handleProdiChange = (item) => {
    setProdi(item.key);
  };

  const handleSemesterChange = (item) => {
    setSemester(item.key);
  };

  const handleNomorHpChange = (event) => {
    setNomorHp(event.target.value);
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
      prodi === "" ||
      semester === "" ||
      username === "" ||
      password === ""
    ) {
      setNamaError(nama === "" ? "Nama tidak boleh kosong" : "");
      setNimError(nim === "" ? "NIM tidak boleh kosong" : "");
      setProdiError(prodi === "" ? "Prodi tidak boleh kosong" : "");
      setSemesterError(semester === "" ? "Semester tidak boleh kosong" : "");
      setUsernameError(username === "" ? "Username tidak boleh kosong" : "");
      setPasswordError(password === "" ? "Password tidak boleh kosong" : "");
    } else {
      setNamaError("");
      setNimError("");
      setProdiError("");
      setSemesterError("");
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
            prodi,
            semester,
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
        console.log(result.data.data);
        setShowModalSuccess(true);
      } catch (error) {
        console.error(error);
        setShowModalError(true);
      }
      setIsLoading(false);
    }
  };

  const dataProdi = [
    { key: "informatika", name: "Teknik Informatika" },
    { key: "komputer", name: "Teknik Komputer" },
    { key: "akuntansi", name: "Akuntansi" },
  ];

  const dataSemester = [
    { key: "1 (Satu)", name: "1 (Satu)" },
    { key: "2 (Dua)", name: "2 (Dua)" },
    { key: "3 (Tiga)", name: "3 (Tiga)" },
    { key: "4 (Empat)", name: "4 (Empat)" },
    { key: "5 (Lima)", name: "5 (Lima)" },
    { key: "6 (Enam)", name: "6 (Enam)" },
    { key: "7 (Tujuh)", name: "7 (Tujuh)" },
    { key: "8 (Delapan)", name: "8 (Delapan)" },
    { key: "9 (Sembilan)", name: "9 (Sembilan)" },
  ];

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
            <Dropdown>
              <Dropdown.Trigger>
                <Input
                  size="lg"
                  bordered
                  color="primary"
                  labelPlaceholder="Prodi"
                  value={prodi}
                  onChange={handleProdiChange}
                  contentRight={<ChevronDown set="bold" />}
                />
              </Dropdown.Trigger>
              <Dropdown.Menu aria-label="Dynamic Actions" items={dataProdi}>
                {(item) => (
                  <Dropdown.Item
                    key={item.key}
                    color={item.key === prodi ? "primary" : "default"}
                    onClick={() => setProdi(item.key)}
                  >
                    {item.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            {prodiError && <Text color="error">{prodiError}</Text>}
            <Spacer y={1.6} />
            <Dropdown>
              <Dropdown.Trigger>
                <Input
                  size="lg"
                  bordered
                  color="primary"
                  labelPlaceholder="Semester"
                  value={semester}
                  onChange={handleSemesterChange}
                  contentRight={<ChevronDown set="bold" />}
                />
              </Dropdown.Trigger>
              <Dropdown.Menu aria-label="Dynamic Actions" items={dataSemester}>
                {(item) => (
                  <Dropdown.Item
                    key={item.key}
                    color={item.key === semester ? "primary" : "default"}
                    onClick={() => setSemester(item.key)}
                  >
                    {item.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            {semesterError && <Text color="error">{semesterError}</Text>}
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
      <Row>
        {showModalSuccess && (
          <Modal
            title="Sukses"
            width={300}
            onClose={() => setShowModalSuccess(false)}
          >
            Data mahasiswa berhasil disimpan.
          </Modal>
        )}

        {showModalError && (
          <Modal
            title="Error"
            width={300}
            onClose={() => setShowModalError(false)}
          >
            Terjadi kesalahan saat menyimpan data mahasiswa.
          </Modal>
        )}
        <Button
          auto
          onClick={handleInput}
          disabled={isLoading}
          css={{ ml: 10 }}
        >
          {isLoading ? <Loading color="currentColor" size="sm" /> : "Simpan"}
        </Button>
      </Row>
    </Box>
  );
};
