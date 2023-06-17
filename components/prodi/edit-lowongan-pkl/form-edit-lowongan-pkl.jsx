import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import {
  Input,
  Text,
  Card,
  Spacer,
  Dropdown,
  Button,
  Loading,
  Modal,
  Image,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import axios from "axios";
import { useRouter } from "next/router";
import { InfoCircle, TickSquare } from "react-iconly";

export const FormEditLowonganPkl = () => {
  // State untuk menyimpan file yang dipilih
  const [selectedFile, setSelectedFile] = useState(null);

  // Callback yang dijalankan setelah file diubah
  const handleFileChange = (files) => {
    setSelectedFile(files[0]);
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
              // value={nama}
              // onChange={handleNamaChange}
              labelPlaceholder="Posisi"
            />
            <Spacer y={1.6} />
            <Input
              size="lg"
              bordered
              color="success"
              // value={nim}
              // onChange={handleNimChange}
              labelPlaceholder="Perusahaan"
            />
            <Spacer y={1.6} />
            <Textarea
              size="lg"
              bordered
              color="success"
              minRows={5}
              // value={nomorHp}
              labelPlaceholder="Alamat"
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
            <FilePond
              allowMultiple={false}
              acceptedFileTypes={["image/*"]}
              instantUpload={false}
              onupdatefiles={handleFileChange}
              labelIdle="Pilih Gambar"
            />
            {selectedFile && (
              <Image src={URL.createObjectURL(selectedFile.file)} alt="Preview" style={{ width: "200px", height: "200px" }} />
            )}
          </Card.Body>
        </Card>
      </Flex>
      <Spacer y={1.6} />
      <Button auto color="success" css={{ ml: 10 }}>
        Simpan
      </Button>

      {/* {showModalSuccess && (
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
              <Text size={20}>Data Lowongan PKL berhasil disimpan.</Text>
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
                Terjadi kesalahan saat menyimpan data lowongan PKL.
              </Text>
            </Modal.Body>
            <Modal.Footer css={{ justifyContent: "center" }}>
              <Button color="success" onPress={() => setShowModalError(false)}>
                Tutup
              </Button>
            </Modal.Footer>
          </Modal>
        )} */}
    </Box>
  );
};
