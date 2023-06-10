import { Card, Text, Modal } from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { Document } from "react-iconly";
import { useRouter } from "next/router";
import { InfoSquare } from "react-iconly";

export const CardBiodataIndustri = ({ data }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleClick = () => {
    if (data.id_biodata_industri) {
      router.push(
        `/biodata-industri?id_biodata_industri=${data.id_biodata_industri}`
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
        bg: "#0072F5",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
      onPress={handleClick}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <Document set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Biodata Industri
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
            <br></br> Belum Membuat Dokumen Biodata Industri
          </Text>
        </Modal.Body>
      </Modal>
    </Card>
  );
};
