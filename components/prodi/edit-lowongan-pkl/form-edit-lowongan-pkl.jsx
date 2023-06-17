import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import {
  Input,
  Text,
  Card,
  Spacer,
  Button,
  Loading,
  Modal,
  Image,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import axios from "axios";
import { useRouter } from "next/router";
import { InfoCircle, TickSquare } from "react-iconly";

export const FormEditLowonganPkl = () => {
  const router = useRouter();
  const { lowongan } = router.query;
  const [idLowongan, setIdLowongan] = useState("");
  const [idProdi, setIdProdi] = useState("");
  const [posisi, setPosisi] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [alamatPerusahaan, setAlamatPerusahaan] = useState("");
  const [posisiError, setPosisiError] = useState("");
  const [perusahaanError, setPerusahaanError] = useState("");
  const [alamatPerusahaanError, setAlamatPerusahaanError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileError, setSelectedFileError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  useEffect(() => {
    if (lowongan) {
      const parsedLowongan = JSON.parse(lowongan);
      setIdLowongan(parsedLowongan.id_lowongan);
      setIdProdi(parsedLowongan.id_prodi);
      setPosisi(parsedLowongan.posisi);
      setPerusahaan(parsedLowongan.nama_perusahaan);
      setAlamatPerusahaan(parsedLowongan.alamat_perusahaan);
      setSelectedFile(parsedLowongan.gambar);
    }
  }, [lowongan])
  
  const handlePerusahaanChange = (event) => {
    setPerusahaan(event.target.value);
  };

  const handleAlamatPerusahaanChange = (event) => {
    setAlamatPerusahaan(event.target.value);
  };

  const handlePosisiChange = (event) => {
    setPosisi(event.target.value);
  }

  const handleFileChange = (files) => {
    if (typeof selectedFile === "string") {
      files = [{ source: selectedFile }];
    }
    setSelectedFile(files[0]);
  };
  

  const handleInput = async () => {
    if (posisi === "" || perusahaan === "" || alamatPerusahaan === "" || selectedFile === null) {
      setPosisiError(posisi === "" ? "Posisi tidak boleh kosong" : "");
      setPerusahaanError(perusahaan === "" ? "Perusahaan tidak boleh kosong" : "");
      setAlamatPerusahaanError(alamatPerusahaan === "" ? "Alamat perusahaan tidak boleh kosong" : "");
      setSelectedFileError(selectedFile === null ? "Gambar tidak boleh kosong" : "");
    } else {
      setPosisiError("");
      setPerusahaanError("");
      setAlamatPerusahaanError("");
      setSelectedFileError("");

      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("posisi", posisi);
        formData.append("nama_perusahaan", perusahaan);
        formData.append("alamat_perusahaan", alamatPerusahaan);
        if (typeof selectedFile === "object") {
          formData.append("gambar", selectedFile.file);
        }
  
        const result = await axios.post(
          `${process.env.API_BASE_URL}/lowongan-pkl/prodi/${idLowongan}?_method=PUT`,
          formData,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setShowModalSuccess(true);
      } catch (error) {
        setShowModalError(true);
      }
      setIsLoading(false);
    }
  }

  const handleModalSuccess = () => {
    setShowModalSuccess(false);
    router.push("/lowongan-pkl");
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
        Edit Data Lowongan
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
              color="success"
              value={posisi}
              onChange={handlePosisiChange}
              labelPlaceholder="Posisi"
            />
            {posisiError && <Text color="error">{posisiError}</Text>}
            <Spacer y={1.6} />
            <Input
              size="lg"
              bordered
              color="success"
              value={perusahaan}
              onChange={handlePerusahaanChange}
              labelPlaceholder="Perusahaan"
            />
            {perusahaanError && <Text color="error">{perusahaanError}</Text>}
            <Spacer y={1.6} />
            <Textarea
              size="lg"
              bordered
              color="success"
              minRows={5}
              value={alamatPerusahaan}
              onChange={handleAlamatPerusahaanChange}
              labelPlaceholder="Alamat"
            />
             {alamatPerusahaanError && <Text color="error">{alamatPerusahaanError}</Text>}
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
            <FilePond
              allowMultiple={false}
              acceptedFileTypes={["image/*"]}
              instantUpload={false}
              onupdatefiles={handleFileChange}
              labelIdle="Pilih Gambar Baru"
            />
            {selectedFileError && <Text color="error">{selectedFileError}</Text>}
            {selectedFile && typeof selectedFile !== "string" && (
              <Image
                src={URL.createObjectURL(selectedFile.file)}
                alt="Preview"
                style={{ width: "200px", height: "200px" }}
              />
            )}
            {selectedFile && typeof selectedFile === "string" && (
              <Image
                src={selectedFile}
                alt="Preview"
                style={{ width: "200px", height: "200px" }}
              />
            )}
          </Card.Body>
        </Card>
      </Flex>
      <Spacer y={1.6} />
      <Button auto onPress={handleInput} disabled={isLoading}  color="success" css={{ ml: 10 }}>
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
              <Text size={20}>Data Lowongan PKL berhasil diperbarui.</Text>
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
                Terjadi kesalahan saat memperbarui data lowongan PKL.
              </Text>
            </Modal.Body>
            <Modal.Footer css={{ justifyContent: "center" }}>
              <Button color="success" onPress={() => setShowModalError(false)}>
                Tutup
              </Button>
            </Modal.Footer>
          </Modal>
        )}
    </Box>
  );
};
