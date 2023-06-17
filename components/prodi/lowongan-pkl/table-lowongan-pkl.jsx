import {
  Card,
  Text,
  Image,
  Grid,
  Spacer,
  Button,
  Table,
  Row,
  Col,
  Tooltip,
  Loading
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { IconButton } from "../../table/table.styled";
import { useRouter } from "next/router";
import { Box } from "../../styles/box";
import { HapusLowonganPkl } from "./hapus-lowongan-pkl";
import { InfoCircle } from "react-iconly";
import axios from "axios";

export const TableLowonganPkl = () => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [number, setNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/lowongan-pkl/prodi`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setData(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        setServerError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleEditClick = (lowongan) => {
    router.push({
      pathname: `/edit-lowongan-pkl`,
      query: { lowongan: JSON.stringify(lowongan) },
    });
  };

  if (serverError) {
    return (
      <>
        <Box css={{ textAlign: "center", flexDirection: "column" }}>
          <InfoCircle set="bold" primaryColor="red" size={100} />
        </Box>
        <Box css={{ textAlign: "center", flexDirection: "column" }}>
          <Text b size={20} css={{ tt: "capitalize", color: "$accents8" }}>
            Terjadi Kesalahan Pada Server
          </Text>
        </Box>
      </>
    );
  }

  if (isLoading) {
    return (
      <Box css={{ textAlign: 'center', flexDirection: 'column' }}>
        <Loading size="xl" color="success" />
      </Box>
    );
  }

  return (
    <Card.Body>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <Text h3>Data Lowongan</Text>
        </Grid>
        <Grid xs={6} justify="end" gap={2}>
          <Tooltip content="Tambah Data Lowongan PKL">
            <Button color="neutral" auto onPress={() => router.push('tambah-lowongan-pkl')}>
              Tambah
            </Button>
          </Tooltip>
          <Spacer x={0.4} />
          <Tooltip content="Scrapping Data Lowongan PKL dari Internet">
            <Button color="success" auto>
              Scrapping Data
            </Button>
          </Tooltip>
        </Grid>
      </Grid.Container>
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
            <Table.Column width={100}>Gambar</Table.Column>
            <Table.Column width={150}>Posisi</Table.Column>
            <Table.Column width={200}>Perusahaan</Table.Column>
            <Table.Column width={150}>Alamat</Table.Column>
            <Table.Column width={150}>Link</Table.Column>
            <Table.Column width={150}>Sumber</Table.Column>
            <Table.Column width={100}>Action</Table.Column>
          </Table.Header>
          <Table.Body>
            {data.map((lowongan) => (
              <Table.Row key={lowongan.id_lowongan}>
                <Table.Cell>
                  <Text b size={12} css={{ tt: "capitalize", color: "$accents7" }}>
                    {number++}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <div style={{ display: "inline-block" }}>
                    <Image
                      src={lowongan.gambar}
                      alt={lowongan.nama_perusahaan}
                      objectFit="cover"
                      width={50}
                      height={50}
                      css={{ borderRadius: "10px" }}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Text b size={12} css={{ tt: "capitalize", color: "$accents7" }}>
                    {lowongan.posisi}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text b size={12} css={{ color: "$accents7" }}>
                    {lowongan.nama_perusahaan}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text b size={12} css={{ color: "$accents7", maxWidth: "200px", whiteSpace: "pre-wrap"}}>
                  {lowongan.alamat_perusahaan}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <a href={lowongan.url} target="_blank" rel="noopener noreferrer">
                    <Text b size={12} css={{ color: "$blue500", maxWidth: "100px", whiteSpace: "pre-wrap"}}>
                        {lowongan.url ? lowongan.url : "-"}
                    </Text>
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <Text b size={12} css={{ color: "$accents7" }}>
                    {lowongan.sumber}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Row
                    justify="center"
                    align="center"
                    css={{ gap: "$8", "@md": { gap: 0 } }}
                  >
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Edit Lowongan PKL">
                        <IconButton onClick={() => handleEditClick(lowongan)}>
                          <Text
                            b
                            size={14}
                            css={{ tt: "capitalize", color: "$yellow600" }}
                          >
                            Edit
                          </Text>
                        </IconButton>
                      </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                      <HapusLowonganPkl data={lowongan} />
                    </Col>
                  </Row>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Box>
    </Card.Body>
  );
};
