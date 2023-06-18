import { Button, Tooltip, Modal, Text, Loading } from "@nextui-org/react";
import { IconButton } from "../../table/table.styled";
import React, { useEffect, useState } from "react";
import { InfoCircle } from "react-iconly";
import axios from "axios";

export const HapusPembimbingProdi = ({ data }) => {
  const [userToken, setUserToken] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handler = () => setVisible(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setUserToken(token || "");
  }, []);

  const closeHandler = () => {
    setVisible(false);
  };

  const confirmDelete = () => {
    setVisible(false);
    handleDelete();
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${process.env.API_BASE_URL}/pembimbing/delete/prodi/${data.id_pembimbing}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      window.location.href = "/kelola-pembimbing-prodi";
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Tooltip content="Hapus Pembimbing" color="error" onClick={handler}>
        <IconButton>
          <Text b size={14} css={{ tt: "capitalize", color: "$red600" }}>
            Hapus
          </Text>
        </IconButton>
      </Tooltip>
      <Modal
        width="500px"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
        {isLoading ? <Loading type="spinner" color="currentColor" size="xl" /> :<InfoCircle set="bold" primaryColor="red" size={100} />}
        </Modal.Header>
        <Modal.Body css={{ textAlign: "center" }}>
          <Text size={20}>Yakin Ingin Menghapus Data?</Text>
        </Modal.Body>
        <Modal.Footer css={{ justifyContent: "center" }}>
          <Button color="error" onPress={confirmDelete}>
            Ya
          </Button>
          <Button color="success" onPress={closeHandler}>Tidak</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
