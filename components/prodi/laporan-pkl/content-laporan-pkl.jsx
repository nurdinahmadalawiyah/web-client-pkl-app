import { Card, Text, Grid } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { id } from "date-fns/locale/id";
import { parseISO, format } from "date-fns";

export const ContentLaporanPkl = () => {
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
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

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
              {format(parseISO(data.tanggal_upload), "dd MMMM yyyy", {
                locale: id,
              })}
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
