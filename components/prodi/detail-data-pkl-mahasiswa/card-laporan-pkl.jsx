import { Card, Text, Modal, Loading, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Box } from "../../styles/box";
import { Upload } from "react-iconly";
import { useRouter } from "next/router";
import { InfoSquare } from "react-iconly";
import axios from "axios";

export const CardLaporanPkl = ({ data }) => {
  const router = useRouter();
  const [getStatusCode, setStatusCode] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/laporan/prodi/${data.id_mahasiswa}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setStatusCode(response.status);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleClick = () => {
    if (getStatusCode != 200) {
      setVisible(true);
    } else {
      router.push(`/laporan-pkl?id_mahasiswa=${data.id_mahasiswa}`);
    }
  };

  return (
    <Card
      isPressable={!isLoading}
      isHoverable
      css={{
        bg: "#17C964",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
      onPress={handleClick}
    >
      <Card.Body>
        {isLoading ? (
          <Loading size="xl" color="white" />
        ) : (
          <>
            <Box css={{ textAlign: "center" }}>
              <Upload set="bold" primaryColor="white" size={100} />
            </Box>
            <Box css={{ textAlign: "center" }}>
              <Text size={16} b color="white">
                Laporan PKL
              </Text>
            </Box>
          </>
        )}
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
            <br></br> Belum Mengirim Laporan PKL
          </Text>
        </Modal.Body>
      </Modal>
    </Card>
  );
};
