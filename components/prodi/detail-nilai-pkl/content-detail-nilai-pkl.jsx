import { Card, Text, Spacer, Grid, Loading, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NilaiPembimbing } from "./nilai-pembimbing";
import { Box } from "../../styles/box";
import { NilaiProdi } from "./nilai-prodi";
import { NilaiAkhir } from "./nilai-akhir";
import axios from "axios";

export const ContentDetailNilaiPkl = () => {
  const [serverError, setServerError] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { id_mahasiswa, nama_mahasiswa, id_tempat_pkl } = router.query;

  useEffect(() => {
    if (id_mahasiswa && nama_mahasiswa, id_tempat_pkl) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_mahasiswa, nama_mahasiswa, id_tempat_pkl]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.API_BASE_URL}/penilaian-prodi/prodi/${id_mahasiswa}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setData(result.data.data);
      console.log(result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
      setIsLoading(false); 
    }
  };

  const handleEditClick = (data) => {
    router.push({
      pathname: `/edit-nilai`,
      query: { data: JSON.stringify(data) },
    });
  };

  const handleEditClickNullData = () => {
    router.push(`/edit-nilai?id_mahasiswa=${id_mahasiswa}&nama_mahasiswa=${nama_mahasiswa}&id_tempat_pkl=${id_tempat_pkl}`);
  };

  if (isLoading) {
    return (
      <div css={{ m: "$10" }}>
        <Box css={{ textAlign: "center", flexDirection: "column" }}>
          <Loading size="xl" color="success" />
        </Box>
      </div>
    );
  }

  if (serverError) {
    return (
      <Card.Body css={{ py: "$10" }}>
        <Grid.Container gap={2}>
          <Grid xs={6}>
            <Text h3>Nilai Mahasiswa {nama_mahasiswa}</Text>
          </Grid>
          <Grid xs={6} justify="end">
            <Button
              color="success"
              auto
              css={{ ml: "$3" }}
              onPress={() => handleEditClickNullData()}
            >
              Edit Nilai
            </Button>
          </Grid>
        </Grid.Container>
        <Text b size={14} css={{ ml: "$10" }}>
          Nilai dari Pembimbing
        </Text>
        <NilaiPembimbing data={data} />
        <Spacer y={0.5} />
        <Text b size={14} css={{ ml: "$10" }}>
          Nilai dari Prodi
        </Text>
        <NilaiProdi data={data} />
        <Spacer y={0.5} />
        <NilaiAkhir data={data} />
      </Card.Body>
    );
  }

  return (
    <Card.Body css={{ py: "$10" }}>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <Text h3>Nilai Mahasiswa {data.nama}</Text>
        </Grid>
        <Grid xs={6} justify="end">
          <Button
            color="success"
            auto
            css={{ ml: "$3" }}
            onPress={() => handleEditClick(data)}
          >
            Edit Nilai
          </Button>
        </Grid>
      </Grid.Container>
      <Text b size={14} css={{ ml: "$10" }}>
        Nilai dari Pembimbing
      </Text>
      <NilaiPembimbing data={data} />
      <Spacer y={0.5} />
      <Text b size={14} css={{ ml: "$10" }}>
        Nilai dari Prodi
      </Text>
      <NilaiProdi data={data} />
      <Spacer y={0.5} />
      <NilaiAkhir data={data} />
    </Card.Body>
  );
};
