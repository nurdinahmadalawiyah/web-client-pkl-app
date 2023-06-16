import { Card, Text, Spacer, Grid, Loading, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "../../styles/box";
import { InfoCircle } from "react-iconly";
import { id } from "date-fns/locale/id";
import { Flex } from "../../styles/flex";
import { NilaiPembimbing } from "./nilai-pembimbing";
import { NilaiProdi } from "./nilai-prodi";
import { NilaiAkhir } from "./nilai-akhir";
import axios from "axios";

export const ContentDetailNilaiPkl = () => {
  const [serverError, setServerError] = useState(false);
  const [data, setData] = useState({});

  const router = useRouter();
  const { id_mahasiswa } = router.query;

  useEffect(() => {
    if (id_mahasiswa) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_mahasiswa]);

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
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  if (serverError) {
    return (
      <Card.Body css={{ py: "$10" }}>
        <Grid.Container gap={2}>
          <Grid xs={6}>
            <Text h3>Nilai Mahasiswa Nama</Text>
          </Grid>
          <Grid xs={6} justify="end">
            <Button color="success" auto css={{ ml: "$3" }}>
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
          <Text h3>Nilai Mahasiswa Nama</Text>
        </Grid>
        <Grid xs={6} justify="end">
          <Button color="neutral" auto>
            Cetak
          </Button>
          <Button color="success" auto css={{ ml: "$3" }}>
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
