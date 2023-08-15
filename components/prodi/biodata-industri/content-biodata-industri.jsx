import { Card, Text, Spacer, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import { InfoCircle } from "react-iconly";
import { IdentitasIndustri } from "./identitas-industri";
import { AktivitasIndustri } from "./aktivitas-industri";
import { TenagaKerjaIndustri } from "./tenaga-kerja-industri";
import axios from "axios";
import { useRouter } from "next/router";

export const ContentBiodataIndustri = () => {
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
          `${process.env.API_BASE_URL}/biodata-industri/prodi/detail/${id_mahasiswa}`,
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
      <Text h3 css={{ ml: "$10" }}>
        Biodata Industri {data.nama}
      </Text>
      <Spacer y={1} />
      <Flex
        css={{
          gap: "$10",
          flexWrap: "wrap",
          justifyContent: "center",
          "@sm": {
            flexWrap: "nowrap",
          },
        }}
        direction={"row"}
      >
        <Flex
          css={{
            gap: "$10",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <IdentitasIndustri data={data} />
          <AktivitasIndustri data={data} />
        </Flex>

        <TenagaKerjaIndustri data={data} />
      </Flex>
    </Card.Body>
  );
};
