import { Table, Text, Row, Col, Tooltip, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import {HapusMahasiswa} from './hapus-mahasiswa';
import { IconButton } from "../../table/table.styled";
import axios from "axios";
import Link from "next/link";
import { InfoCircle } from "react-iconly";

export const TableMahasiswa = () => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/mahasiswa/list`,
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
    };

    fetchData();
  }, []);

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
            <Table.Row key={mahasiswa.id_pengajuan}>
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
                  <Tooltip content="Tambah User">
                  <Link href="/tambah-mahasiswa">
                    <IconButton onClick={() => console.log("View user", mahasiswa.id_mahasiswa)}>
                      <Text b size={14} css={{ tt: "capitalize", color: "$green600" }}>
                        Tambah
                      </Text>
                    </IconButton>
                  </Link>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Edit user">
                    <Link href="/edit-mahasiswa">
                    <IconButton onClick={() => console.log("Edit user", mahasiswa.id_mahasiswa)}>
                      <Text b size={14} css={{ tt: "capitalize", color: "$yellow600" }}>
                        Edit
                      </Text>
                    </IconButton>
                    </Link>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <HapusMahasiswa />
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
