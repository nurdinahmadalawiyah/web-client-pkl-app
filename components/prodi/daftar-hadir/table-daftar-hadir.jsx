import { Card, Text, Loading, Table, Image } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { InfoCircle } from "react-iconly";
import axios from "axios";
import { useRouter } from "next/router";

export const TableDaftarHadir = () => {
  const [serverError, setServerError] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { id_mahasiswa } = router.query;

  useEffect(() => {
    if (id_mahasiswa) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_mahasiswa]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.API_BASE_URL}/daftar-hadir/prodi/${id_mahasiswa}`,
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
      console.log(error);
      setServerError(true);
    }
    setIsLoading(false);
  };

  if (serverError) {
    return (
      <div css={{ m: "$10" }}>
        <Box css={{ textAlign: "center", flexDirection: "column" }}>
          <InfoCircle set="bold" primaryColor="red" size={100} />
        </Box>
        <Box css={{ textAlign: "center", flexDirection: "column" }}>
          <Text b size={20} css={{ tt: "capitalize", color: "$accents8" }}>
            Terjadi Kesalahan Pada Server
          </Text>
        </Box>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Box css={{ textAlign: "center", flexDirection: "column" }}>
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
        aria-label="Table Data Pengajuan PKL"
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
          <Table.Column>Minggu Ke</Table.Column>
          <Table.Column align="center">Senin</Table.Column>
          <Table.Column align="center">Selasa</Table.Column>
          <Table.Column align="center">Rabu</Table.Column>
          <Table.Column align="center">Kamis</Table.Column>
          <Table.Column align="center">Jumat</Table.Column>
          <Table.Column align="center">Sabtu</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.minggu}>
              <Table.Cell>
                <Text
                  b
                  size={12}
                  css={{ tt: "capitalize", color: "$accents7" }}
                >
                  Minggu Ke {item.minggu}
                </Text>
              </Table.Cell>
              <Table.Cell>
                {item.data_kehadiran &&
                  item.data_kehadiran
                    .filter(
                      (kehadiran) =>
                        kehadiran.hari_tanggal &&
                        new Date(kehadiran.hari_tanggal).getDay() === 1
                    )
                    .map((data) => (
                      <Image
                        key={data.id_daftar_hadir}
                        src={data.tanda_tangan}
                        alt="Tanda Tangan"
                        width={50}
                        height={50}
                      />
                    ))}
              </Table.Cell>
              <Table.Cell>
                {item.data_kehadiran &&
                  item.data_kehadiran
                    .filter(
                      (kehadiran) =>
                        kehadiran.hari_tanggal &&
                        new Date(kehadiran.hari_tanggal).getDay() === 2
                    )
                    .map((data) => (
                      <Image
                        key={data.id_daftar_hadir}
                        src={data.tanda_tangan}
                        alt="Tanda Tangan"
                        width={50}
                        height={50}
                      />
                    ))}
              </Table.Cell>
              <Table.Cell>
                {item.data_kehadiran &&
                  item.data_kehadiran
                    .filter(
                      (kehadiran) =>
                        kehadiran.hari_tanggal &&
                        new Date(kehadiran.hari_tanggal).getDay() === 3
                    )
                    .map((data) => (
                      <Image
                        key={data.id_daftar_hadir}
                        src={data.tanda_tangan}
                        alt="Tanda Tangan"
                        width={50}
                        height={50}
                      />
                    ))}
              </Table.Cell>
              <Table.Cell>
                {item.data_kehadiran &&
                  item.data_kehadiran
                    .filter(
                      (kehadiran) =>
                        kehadiran.hari_tanggal &&
                        new Date(kehadiran.hari_tanggal).getDay() === 4
                    )
                    .map((data) => (
                      <Image
                        key={data.id_daftar_hadir}
                        src={data.tanda_tangan}
                        alt="Tanda Tangan"
                        width={50}
                        height={50}
                      />
                    ))}
              </Table.Cell>
              <Table.Cell>
                {item.data_kehadiran &&
                  item.data_kehadiran
                    .filter(
                      (kehadiran) =>
                        kehadiran.hari_tanggal &&
                        new Date(kehadiran.hari_tanggal).getDay() === 5
                    )
                    .map((data) => (
                      <Image
                        key={data.id_daftar_hadir}
                        src={data.tanda_tangan}
                        alt="Tanda Tangan"
                        width={50}
                        height={50}
                      />
                    ))}
              </Table.Cell>
              <Table.Cell>
                {item.data_kehadiran &&
                  item.data_kehadiran
                    .filter(
                      (kehadiran) =>
                        kehadiran.hari_tanggal &&
                        new Date(kehadiran.hari_tanggal).getDay() === 6
                    )
                    .map((data) => (
                      <Image
                        key={data.id_daftar_hadir}
                        src={data.tanda_tangan}
                        alt="Tanda Tangan"
                        width={50}
                        height={50}
                      />
                    ))}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
};
