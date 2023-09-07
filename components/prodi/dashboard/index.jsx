/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import { CardWelcomeProdi } from "./card-welcome-prodi";
import { CardTotalMahasiswaProdi } from "./card-total-mahasiswa-prodi";
import { CardMahasiswaMengajukanPkl } from "./card-mahasiswa-mengajukan-pkl";
import { CardMahasiswaTelahPkl } from "./card-mahasiswa-telah-pkl";
import { CardMahasiswaBelumPkl } from "./card-mahasiswa-belum-pkl";
import { useRouter } from "next/router";
import axios from "axios";

export const DashboardProdi = () => {
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role !== "Prodi") {
      router.push("/login-prodi");
    }
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/tempat-pkl/prodi/data`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setData(response.data.data)
      console.log(response.data.data);
      console.log(data.total_mahasiswa);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Box>
        <Flex
          css={{
            gap: "$10",
            flexWrap: "wrap",
            justifyContent: "center",
            "@sm": {
              flexWrap: "nowrap",
            },
          }}
          direction={"column"}
        >
          <CardWelcomeProdi />
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
            <CardTotalMahasiswaProdi data={data} />
            <CardMahasiswaMengajukanPkl data={data} />
            <CardMahasiswaTelahPkl data={data} />
            <CardMahasiswaBelumPkl data={data} />

          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
