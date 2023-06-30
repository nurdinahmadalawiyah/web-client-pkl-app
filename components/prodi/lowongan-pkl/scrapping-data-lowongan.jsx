import {
  Button,
  Tooltip,
  Modal,
  Text,
  Loading,
  Grid,
  Table,
  Image,
} from "@nextui-org/react";
import { Box } from "../../styles/box";
import React, { useEffect, useState } from "react";
import { PaperDownload } from "react-iconly";
import { useRouter } from "next/router";
import axios from "axios";

export const ScrappingDataLowongan = () => {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [number, setNumber] = useState(1);
  const handler = () => setVisible(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setUserToken(token || "");
  }, []);

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/lowongan-pkl/prosple`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const confirmSaveData = async () => {
    setIsLoading(true);
    try {
      await handleSaveData();
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  

  const handleSaveData = async () => {
    try {
      await axios.get(`${process.env.API_BASE_URL}/lowongan-pkl/save-prosple`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      window.location.href = "/lowongan-pkl";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Tooltip content="Scrapping Data Lowongan PKL dari Internet">
        <Button color="success" auto onPress={handler}>
          Scrapping Data
        </Button>
      </Tooltip>
      <Modal
      closeButton
      preventClose
        width="1000px"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ textAlign: "center" }}>
          <Grid.Container gap={2}>
            <Grid xs={6}>
              <Text h4 align="start">Hasil Scrapping Data Lowongan PKL dari Prosple.com</Text>
            </Grid>
            <Grid xs={6} justify="end" gap={2}>
              <Tooltip content="Tambah Data Lowongan PKL">
                <Button
                  icon={<PaperDownload set="bold" />}
                  color="success"
                  onPress={confirmSaveData}
                >
                  Simpan Data
                </Button>
              </Tooltip>
            </Grid>
          </Grid.Container>
        </Modal.Header>
        <Modal.Body css={{ justifyContent: "center" }}>
          {isLoading ? (
            <Box css={{ textAlign: "center", flexDirection: "column" }}>
              <Loading size="xl" color="success" />
            </Box>
          ) : (
            <Box
              css={{
                "& .nextui-table-container": {
                  boxShadow: "none",
                },
              }}
            >
              <Table
                aria-label="Example table with custom cells"
                css={{
                  height: "auto",
                  minWidth: "100%",
                  boxShadow: "none",
                  width: "100%",
                  px: 0,
                }}
                selectionMode="single"
                color="success"
              >
                <Table.Header>
                  <Table.Column width={50}>No</Table.Column>
                  <Table.Column width={100}>Posisi</Table.Column>
                  <Table.Column width={100}>Perusahaan</Table.Column>
                  <Table.Column width={150}>Alamat</Table.Column>
                  <Table.Column width={150}>Link</Table.Column>
                </Table.Header>
                <Table.Body>
                  {data.map((lowongan) => (
                    <Table.Row key={lowongan.id_lowongan}>
                      <Table.Cell>
                        <Text
                          b
                          size={12}
                          css={{ tt: "capitalize", color: "$accents7" }}
                        >
                          {number++}
                        </Text>
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          maxWidth: "100px",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            maxWidth: "200px",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          <div style={{ marginRight: "20px" }}>
                            <Image
                              src={lowongan.gambar}
                              alt={lowongan.nama_perusahaan}
                              objectFit="cover"
                              width={50}
                              height={50}
                              css={{ borderRadius: "10px" }}
                            />
                          </div>
                          <div style={{ textAlign: "left" }}>
                            <Text
                              b
                              size={12}
                              css={{ tt: "capitalize", color: "$accents7" }}
                            >
                              {lowongan.posisi}
                            </Text>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Text
                          b
                          size={12}
                          css={{
                            color: "$accents7",
                            maxWidth: "200px",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {lowongan.nama_perusahaan}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text
                          b
                          size={12}
                          css={{
                            color: "$accents7",
                            maxWidth: "200px",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {lowongan.alamat_perusahaan}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          href={lowongan.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text
                            b
                            size={12}
                            css={{
                              color: "$blue500",
                              maxWidth: "100px",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {lowongan.url ? lowongan.url : "-"}
                          </Text>
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Box>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
