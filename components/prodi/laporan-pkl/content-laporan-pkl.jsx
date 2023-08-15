import { Card, Text, Grid, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box } from "../../styles/box";
import { InfoCircle } from "react-iconly";
import { DateTime } from "luxon";

export const ContentLaporanPkl = () => {
  const [serverError, setServerError] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        `${process.env.API_BASE_URL}/laporan/prodi/${id_mahasiswa}`,
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
      <div css={{ m: "$10" }}>
        <Box css={{ textAlign: "center", flexDirection: "column" }}>
          <Loading size="xl" color="success" />
        </Box>
      </div>
    );
  }

  return (
    <Card.Body css={{ py: "$10" }}>
      <Grid.Container gap={2}>
        <Grid xs={6} direction="column">
          <Text h3>Laporan PKL {data.nama}</Text>
        </Grid>
        <Grid xs={6} justify="end">
          {data.tanggal_upload ? (
            <Text color="#B9B9B9">
              Di Upload pada tanggal{" "}
              {DateTime.fromISO(data.tanggal_upload).setLocale('id').toFormat('dd MMMM yyyy')}
            </Text>
          ) : (
            ""
          )}
        </Grid>
      </Grid.Container>
      <object
        width="100%"
        height="768"
        data={data.file}
        type="application/pdf"
      />
    </Card.Body>
  );
};
