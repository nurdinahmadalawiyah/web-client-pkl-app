import {
  Input,
  Text,
  Card,
  Spacer,
  Tooltip,
  Grid,
  Modal,
  Loading,
  Button,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import axios from "axios";
import { useRouter } from "next/router";
import { InfoCircle, TickSquare } from "react-iconly";
import { DropdownInput } from "../tambah-mahasiswa/dropdown-input";

export const FormEditMahasiswa = () => {
  const router = useRouter();
  const { mahasiswa } = router.query;
  const [idMahasiswa, setIdMahasiswa] = useState("");
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("Pilih Prodi");
  const [semester, setSemester] = useState("Pilih Semester");
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

  useEffect(() => {
    if (mahasiswa) {
      const parsedMahasiswa = JSON.parse(mahasiswa);
      setIdMahasiswa(parsedMahasiswa.id_mahasiswa);
      setNama(parsedMahasiswa.nama);
      setNim(parsedMahasiswa.nim);
      setProdi(parsedMahasiswa.id_prodi.toString());
      setSemester(parsedMahasiswa.semester);
      setNomorHp(parsedMahasiswa.nomor_hp);
      setEmail(parsedMahasiswa.email);
      setUsername(parsedMahasiswa.username);
    }
  }, [mahasiswa]);

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleNimChange = (event) => {
    setNim(event.target.value);
  };

  const handleProdiChange = React.useMemo(() => {
    if (prodi && typeof prodi !== "undefined") {
      return Array.from(prodi).join("").replaceAll("_", " ");
    } else {
      return "";
    }
  }, [prodi]);

  const handleSemesterChange = React.useMemo(() => {
    if (semester && typeof semester !== "undefined") {
      return Array.from(semester).join("").replaceAll("_", " ");
    } else {
      return "";
    }
  }, [semester]);

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
      prodi === "Pilih Prodi" ||
      semester === "Pilih Semester" ||
      username === ""
    ) {
      setNamaError(nama === "" ? "Nama tidak boleh kosong" : "");
      setNimError(nim === "" ? "NIM tidak boleh kosong" : "");
      setProdiError(prodi === "Pilih Prodi" ? "Silakan pilih Prodi" : "");
      setSemesterError(
        semester === "Pilih Semester" ? "Silakan pilih Semester" : ""
      );
      setUsernameError(username === "" ? "Username tidak boleh kosong" : "");
    } else if (password !== "" && password.length < 8) {
      setPasswordError("Password minimal harus 8 karakter");
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
          `${process.env.API_BASE_URL}/mahasiswa/update/${idMahasiswa}?_method=PUT`,
          {
            username,
            nama,
            nim,
            prodi: handleProdiChange,
            semester: handleSemesterChange,
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
        Edit Data Mahasiswa
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
            <DropdownInput
              prodi={prodi}
              setProdi={setProdi}
              handleProdiChange={handleProdiChange}
              semester={semester}
              setSemester={setSemester}
              handleSemesterChange={handleSemesterChange}
            />
            <Grid.Container>
              <Grid xs={6}>
                {prodiError && <Text color="error">{prodiError}</Text>}
              </Grid>
              <Grid xs={6}>
                {semesterError && <Text color="error">{semesterError}</Text>}
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
            <Text size={20}>Data mahasiswa berhasil diperbarui.</Text>
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
              Terjadi kesalahan saat memperbarui data mahasiswa.
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
