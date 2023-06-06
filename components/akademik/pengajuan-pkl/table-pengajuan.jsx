import { Table, Text, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "../../table/table.styled";
import { Box } from "../../styles/box";
import { useRouter } from 'next/router';
import { InfoCircle } from "react-iconly";

const TablePengajuan = () => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/pengajuan-pkl/akademik`,
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

  const handleDetailClick = (idPengajuan) => {
    router.push(`/detail-pengajuan-pkl?id_pengajuan=${idPengajuan}`);
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

  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        aria-label="Table Data Pengajuan PKL"
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
          <Table.Column>Nama Perusahaan</Table.Column>
          <Table.Column>Alamat Perusahaan</Table.Column>
          <Table.Column>Tanggal Mulai</Table.Column>
          <Table.Column>Tanggal Selesai</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((data) => (
            <Table.Row key={data.id_pengajuan}>
              <Table.Cell>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
                    {data.nama}
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
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7", maxWidth: "200px", whiteSpace: "pre-wrap"}}>
                  {data.nama_perusahaan}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7", maxWidth: "200px", whiteSpace: "pre-wrap"}}>
                  {data.alamat_perusahaan}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {new Date(data.tanggal_mulai).toLocaleDateString("id-ID")}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {new Date(data.tanggal_selesai).toLocaleDateString("id-ID")}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Tooltip content="Details">
                  <IconButton onClick={() => handleDetailClick(data.id_pengajuan)}>
                    <Text b size={14} css={{ tt: "capitalize", color: "$blue600" }}>
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

export default TablePengajuan;
