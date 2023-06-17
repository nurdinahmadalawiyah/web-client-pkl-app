import { Card, Text, Modal } from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { Upload } from "react-iconly";
import { useRouter } from "next/router";
import { InfoSquare } from "react-iconly";

export const CardLaporanPkl = ({data}) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleClick = () => {
    if (data.id_mahasiswa && data.id_biodata_industri) {
      router.push(
        `/laporan-pkl?id_mahasiswa=${data.id_mahasiswa}`
      );
    } else {
      setVisible(true);
    }
  };

  return (
    <Card
      isPressable
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
        <Box css={{ textAlign: "center" }}>
          <Upload set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Laporan PKL
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
            <br></br> Belum Mengirim Laporan PKL
          </Text>
        </Modal.Body>
      </Modal>
    </Card>
  );
};