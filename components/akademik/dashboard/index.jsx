/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import { CardWelcomeAkademik } from "./card-welcome-akademik";
import { useRouter } from "next/router";
import OneSignalReact from "react-onesignal";
import { CardTotalMahasiswa } from "./card-total-mahasiswa";
import { CardMahasiswaMengajukan } from "./card-mahasiswa-mengajukan";
import { CardMahasiswaSedangPkl } from "./card-mahasiswa-sedang-pkl";
import { CardMahasiswaBelumPkl } from "./card-mahasiswa-belum-pkl";
import axios from "axios";

export const DashboardAkademik = () => {
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role !== "Akademik") {
      router.push("/login-akademik");
    }
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/tempat-pkl/akademik/data`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
      console.log(data.total_mahasiswa);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    OneSignalReact.showNativePrompt();
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
          <CardWelcomeAkademik />
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
            <CardTotalMahasiswa data={data} />
            <CardMahasiswaMengajukan data={data} />
            <CardMahasiswaSedangPkl data={data} />
            <CardMahasiswaBelumPkl data={data} />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
