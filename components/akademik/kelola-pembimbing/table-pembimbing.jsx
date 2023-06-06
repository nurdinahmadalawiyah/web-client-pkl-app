import { Col, Row, Table, Text, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import {HapusPembimbing} from './hapus-pembimbing';
import { IconButton } from "../../table/table.styled";
import axios from "axios";
import Link from "next/link";
import { InfoCircle } from "react-iconly";

export const TablePembimbing = () => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/pembimbing/list`,
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
        aria-label="Example table with custom cells"
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
          <Table.Column>NIK/NIP</Table.Column>
          <Table.Column>Username</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((pembimbing) => (
            <Table.Row key={pembimbing.id_pengajuan}>
              <Table.Cell>
                <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
                    {pembimbing.nama}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                  {pembimbing.nik}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{color: "$accents7" }}>
                  {pembimbing.username}
                </Text>
              </Table.Cell>
              <Table.Cell>
              <Row
                justify="center"
                align="center"
                css={{ gap: "$8", "@md": { gap: 0 } }}
              >
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Tambah user">
                    <Link href="/tambah-pembimbing">
                    <IconButton onClick={() => console.log("View user", pembimbing.id_pembimbing)}>
                      <Text b size={14} css={{ tt: "capitalize", color: "$green600" }}>
                        Tambah
                      </Text>
                    </IconButton>
                    </Link>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Edit user">
                    <Link href="/edit-pembimbing">
                    <IconButton onClick={() => console.log("Edit user", pembimbing.id_pembimbing)}>
                      <Text b size={14} css={{ tt: "capitalize", color: "$yellow600" }}>
                        Edit
                      </Text>
                    </IconButton>
                    </Link>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <HapusPembimbing />
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
