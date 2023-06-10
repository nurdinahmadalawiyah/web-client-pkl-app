import { Card, Text, Spacer, Grid, Row } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { InfoCircle, ChevronRight } from "react-iconly";
import axios from "axios";
import { useRouter } from "next/router";

export const ContentJurnalKegiatan = () => {
  const [serverError, setServerError] = useState(false);
  const [data, setData] = useState([]);

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
        `${process.env.API_BASE_URL}/jurnal-kegiatan/prodi/${id_mahasiswa}`,
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

  return (
    <Card.Body css={{ py: "$10" }}>
      <Text h3 css={{ ml: "$10" }}>
        Jurnal Kegiatan
      </Text>
      <Spacer y={1} />
      <Grid.Container gap={2} justify="start">
        {data.map((item) => (
          <Grid key={item.minggu} xs={12} sm={6} md={6}>
            <Card
              isPressable
              isHoverable
              variant="flat"
              css={{
                bg: "$gray100",
                borderRadius: "$xl",
                px: "$10",
                flex: "1 1 100%",
                justifyContent: "center",
              }}
              onPress={() =>
                router.push({
                  pathname: "/detail-jurnal-kegiatan",
                  query: { jurnalData: JSON.stringify(item) },
                })
              }
            >
              <Card.Body>
                <Row justify="space-between">
                  <Text b size="$md">
                    Minggu {item.minggu}
                  </Text>
                  <ChevronRight set="light" />
                </Row>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Card.Body>
  );
};
