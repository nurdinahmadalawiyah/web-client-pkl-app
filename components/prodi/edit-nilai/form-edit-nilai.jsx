import {
  Input,
  Text,
  Card,
  Spacer,
  Loading,
  Button,
  Modal,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import axios from "axios";
import { InfoCircle, TickSquare } from "react-iconly";
import { useRouter } from "next/router";

export const FormEditNilai = () => {
  const router = useRouter();
  const { data } = router.query;
  const [namaMahasiswa, setNamaMahasiswa] = useState("");
  const [idMahasiswa, setIdMahasiswa] = useState("");
  const [idTempatPkl, setIdTempatPkl] = useState("");
  const [presentasi, setPresentasi] = useState("");
  const [dokumen, setDokumen] = useState("");
  const [presentasiError, setPresentasiError] = useState("");
  const [dokumenError, setDokumenError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  useEffect(() => {
    if (data) {
      const parsedNilai = JSON.parse(data);
      setNamaMahasiswa(parsedNilai.nama);
      setIdMahasiswa(parsedNilai.id_mahasiswa);
      setIdTempatPkl(parsedNilai.id_tempat_pkl);
      setPresentasi(parsedNilai.presentasi);
      setDokumen(parsedNilai.dokumen);
    }
  }, [data]);

  const { id_mahasiswa, nama_mahasiswa, id_tempat_pkl } = router.query;

//   useEffect(() => {
//     if (id_mahasiswa && nama_mahasiswa, id_tempat_pkl) {
//       handleInput();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id_mahasiswa, nama_mahasiswa, id_tempat_pkl]);

  const handlePresentasiChange = (event) => {
    setPresentasi(event.target.value);
  };

  const handleDokumenChange = (event) => {
    setDokumen(event.target.value);
  };

  const handleInput = async () => {
    if (presentasi === "" || dokumen === "") {
      setPresentasiError(
        presentasi === "" ? "Nilai Presentasi tidak boleh kosong" : ""
      );
      setDokumenError(dokumen === "" ? "Nilai Dokumen tidak boleh kosong" : "");
    } else {
      setPresentasiError;
      setDokumenError;
      setIsLoading(true);

      try {
        console.log(data)
        const result = await axios.post(
          `${process.env.API_BASE_URL}/penilaian-prodi/prodi`,
          {
            id_mahasiswa: idMahasiswa ? idMahasiswa : id_mahasiswa,
            id_tempat_pkl: idTempatPkl ? idTempatPkl : id_tempat_pkl,
            presentasi,
            dokumen,
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
    router.push(`/detail-nilai-pkl?id_mahasiswa=${idMahasiswa ? idMahasiswa : id_mahasiswa}&nama_mahasiswa=${namaMahasiswa ? namaMahasiswa : nama_mahasiswa}&id_tempat_pkl=${idTempatPkl ? idTempatPkl : id_tempat_pkl}`);
  };

  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Spacer y={1.0} />
      <Text h3 css={{ ml: 10 }}>
        Edit Nilai Mahasiswa {namaMahasiswa ? namaMahasiswa : nama_mahasiswa}
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
              color="success"
              value={presentasi}
              onChange={handlePresentasiChange}
              type="number" 
              labelPlaceholder="Nilai Presentasi"
            />
            {presentasiError && <Text color="error">{presentasiError}</Text>}
            <Spacer y={1.6} />
            <Input
              size="lg"
              bordered
              color="success"
              value={dokumen}
              onChange={handleDokumenChange}
              type="number" 
              labelPlaceholder="Nilai Dokumen"
            />
            {dokumenError && <Text color="error">{dokumenError}</Text>}
          </Card.Body>
        </Card>
      </Flex>
      <Spacer y={1.6} />
      <Button
        auto
        onPress={handleInput}
        disabled={isLoading}
        color="success"
        css={{ ml: 10 }}
      >
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
            <Text size={20}>Nilai PKL berhasil diperbarui.</Text>
          </Modal.Body>
          <Modal.Footer css={{ justifyContent: "center" }}>
            <Button color="error" onPress={handleModalSuccess}>
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
            <Text size={20}>Terjadi kesalahan saat memperbarui Nilai PKL.</Text>
          </Modal.Body>
          <Modal.Footer css={{ justifyContent: "center" }}>
            <Button color="error" onPress={() => setShowModalError(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Box>
  );
};
