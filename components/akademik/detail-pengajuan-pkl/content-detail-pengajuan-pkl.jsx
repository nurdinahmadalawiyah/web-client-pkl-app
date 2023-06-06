import { Button, Card, Row, Text, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import { InfoCircle } from "react-iconly";
import axios from "axios";
import { useRouter } from "next/router";
import { CardMahasiswa } from "./card-mahasiswa";
import { CardDataPengajuan } from "./card-data-pengajuan";
import { ApprovePengajuanComponent } from "./approve-pengajuan-component";
import { RejectPengajuanComponent } from "./reject-pengajuan-component";

export const ContentDetailPengajuanPkl = () => {
  const [data, setData] = useState({});
  const [serverError, setServerError] = useState(false);

  const router = useRouter();
  const { id_pengajuan } = router.query;

  useEffect(() => {
    if (id_pengajuan) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_pengajuan]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.API_BASE_URL}/pengajuan-pkl/akademik/${id_pengajuan}`,
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
        Pengajuan PKL oleh<>&nbsp;</>
        {data.nama}
      </Text>

      <Flex
        css={{
          gap: "$10",
          mb: "$10",
          ml: "$10",
          mr: "$10",
          flexWrap: "wrap",
          justifyContent: "center",
          "@sm": {
            flexWrap: "nowrap",
          },
        }}
        direction={"row"}
      >
        <Row>
          <Tooltip
            content={"Surat bisa dicetak saat pengajuan telah disetujui"}
            color="primary"
          >
            <Button
              auto
              onClick={() => window.open(data.surat)}
              disabled={data.status !== "disetujui"}
            >
              Cetak
            </Button>
          </Tooltip>
        </Row>
        <Row justify="flex-end" css={{ gap: "$5" }}>
          <ApprovePengajuanComponent data={data} />
          <RejectPengajuanComponent data={data} />
        </Row>
      </Flex>

      <Flex
        css={{
          gap: "$10",
          flexWrap: "wrap",
          ml: "$10",
          mr: "$10",
          justifyContent: "center",
          "@sm": {
            flexWrap: "nowrap",
          },
        }}
        direction={"row"}
      >
        <Card
          css={{
            bg: "$blue600",
            borderRadius: "$xl",
            px: "$6",
            flex: "1 1 100%",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <CardMahasiswa data={data} />
        </Card>
        <Card
          css={{
            bg: "#30E3CA",
            borderRadius: "$xl",
            flex: "1 1 100%",
            marginBottom: "10px",
          }}
        >
          <CardDataPengajuan data={data} />
        </Card>
      </Flex>
    </Card.Body>
  );
};
