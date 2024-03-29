import { Table, Text, Row, Col, Tooltip, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { HapusMahasiswaProdi } from "./hapus-mahasiswa-prodi";
import { IconButton } from "../../table/table.styled";
import axios from "axios";
import { InfoCircle } from "react-iconly";
import { useRouter } from 'next/router';

export const TableMahasiswaProdi = ({selectedValue}) => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/mahasiswa/list/prodi?tahun_masuk=${selectedValue.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:  `Bearer ${localStorage.getItem("accessToken")}`,
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
  }, [selectedValue]);

  const handleEditClick = (mahasiswa) => {
    router.push({
      pathname: `/edit-mahasiswa-prodi`,
      query: { mahasiswa: JSON.stringify(mahasiswa) },
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
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        aria-label="Table Data Mahasiswa"
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
          <Table.Column>Nama</Table.Column>
          <Table.Column>Prodi</Table.Column>
          <Table.Column>Semester</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Username</Table.Column>
          <Table.Column>Nomor HP</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((mahasiswa) => (
            <Table.Row key={mahasiswa.id_mahasiswa}>
              <Table.Cell>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text b size={15} css={{ tt: "capitalize", color: "$accents7" }}>
                    {mahasiswa.nama}
                  </Text>
                  <Text b size={12} css={{ tt: "capitalize", color: "$accents7" }}>
                    {mahasiswa.nim}
                  </Text>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                  {mahasiswa.nama_prodi}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                  {mahasiswa.semester}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={13} css={{ color: "$accents7" }}>
                  {mahasiswa.email ? mahasiswa.email : "-"} 
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={13} css={{ color: "$accents7" }}>
                  {mahasiswa.username}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                  {mahasiswa.nomor_hp ? mahasiswa.nomor_hp : "-"}
                </Text>
              </Table.Cell>
              <Table.Cell>
              <Row  
                justify="center"
                align="center"
                css={{ gap: "$8", "@md": { gap: 0 } }}
              >
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Edit Mahasiswa">
                    <IconButton onClick={() => handleEditClick(mahasiswa)}>
                      <Text b size={14} css={{ tt: "capitalize", color: "$yellow600" }}>
                        Edit
                      </Text>
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <HapusMahasiswaProdi data={mahasiswa} />
                </Col>
              </Row>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
};
