import { Col, Row, Table, Text, Tooltip, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { HapusPembimbingProdi } from './hapus-pembimbing-prodi';
import { IconButton } from "../../table/table.styled";
import axios from "axios";
import { InfoCircle } from "react-iconly";
import { useRouter } from 'next/router';

export const TablePembimbingProdi = () => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/pembimbing/list/prodi`,
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
  }, []);

  const handleEditClick = (pembimbing) => {
    router.push({
      pathname: `/edit-pembimbing-prodi`,
      query: { pembimbing: JSON.stringify(pembimbing) },
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
          <Table.Column>Nama</Table.Column>
          <Table.Column>NIK/NIP</Table.Column>
          <Table.Column>Username</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((pembimbing) => (
            <Table.Row key={pembimbing.id_pembimbing}>
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
                  <Tooltip content="Edit Pembimbing">
                    <IconButton onClick={() => handleEditClick(pembimbing)}>
                      <Text b size={14} css={{ tt: "capitalize", color: "$yellow600" }}>
                        Edit
                      </Text>
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <HapusPembimbingProdi data={pembimbing} />
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
