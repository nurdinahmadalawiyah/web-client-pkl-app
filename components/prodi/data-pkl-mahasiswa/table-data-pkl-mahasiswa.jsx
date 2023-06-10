import { Table, Text, Tooltip, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "../../table/table.styled";
import { Box } from "../../styles/box";
import { useRouter } from 'next/router';
import { InfoCircle } from "react-iconly";

export const TableDataPklMahasiswa = () => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/tempat-pkl/prodi`,
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

  const handleDetailClick = (data) => {
    router.push({
      pathname: "/detail-data-pkl-mahasiswa",
      query: { data: JSON.stringify(data) },
    });
  };

  if (serverError) {
    return (
      <><Box css={{ textAlign: 'center', flexDirection: 'column' }}>
        <InfoCircle set="bold" primaryColor="red" size={100} />
      </Box><Box css={{ textAlign: 'center', flexDirection: 'column' }}>  
          <Text b size={20} css={{ tt: "capitalize", color: "$accents8" }}>
            Terjadi Kesalahan Pada Server
          </Text>
        </Box></>
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
        aria-label="Table Data PKL Mahasiswa"
        color="success"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column>Nama</Table.Column>
          <Table.Column>Prodi</Table.Column>
          <Table.Column>Tempat PKL</Table.Column>
          <Table.Column>Nama Pembimbing</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((data) => (
            <Table.Row key={data.id_tempat_pkl}>
              <Table.Cell>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
                    {data.nama_mahasiswa}
                  </Text>
                  <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                    {data.nim}
                  </Text>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                  {data.nama_prodi}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                  {data.nama_perusahaan}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                  {data.nama_pembimbing}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Tooltip content="Details">
                  <IconButton onClick={() => handleDetailClick(data)}>
                    <Text b size={14} css={{ tt: "capitalize", color: "$green600" }}>
                      Detail &gt;
                    </Text>
                  </IconButton>
                </Tooltip>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
};
