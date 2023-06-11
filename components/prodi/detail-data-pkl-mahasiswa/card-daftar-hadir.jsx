import { Card, Text, Modal } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { Paper, InfoSquare } from "react-iconly";
import { useRouter } from "next/router";
import axios from "axios";

export const CardDaftarHadir = ({ data }) => {
  const router = useRouter();
  const [getData, setGetData] = useState([]);
  const [visible, setVisible] = useState(false);

  const closeHandler = () => {
    setVisible(false);
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.API_BASE_URL}/daftar-hadir/prodi/${data.id_mahasiswa}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setGetData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    if (getData.length === 0) {
      setVisible(true);
    } else {
      router.push(`/daftar-hadir?id_mahasiswa=${data.id_mahasiswa}&nama_mahasiswa=${data.nama_mahasiswa}`);
    }
  }

  return (
    <Card
      isPressable
      isHoverable
      css={{
        bg: "#F31260",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
      onPress={handleClick}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <Paper set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Daftar Hadir
          </Text>
        </Box>
      </Card.Body>
      <Modal
        width="500px"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <InfoSquare set="bold" primaryColor="orange" size={100} />
        </Modal.Header>
        <Modal.Body css={{ textAlign: "center" }}>
            <Text size={20}>
              {data.nama_mahasiswa}
              <br></br> Belum Membuat Dokumen Daftar Hadir
            </Text>
        </Modal.Body>
      </Modal>
    </Card>
  );
};
