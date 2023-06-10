import { Card, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Flex } from "../../styles/flex";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from "next/router";
import { ContentJurnalKegiatan } from "./content-jurnal-kegiatan"

export const JurnalKegiatan = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role !== "Prodi") {
      router.push("/login-prodi");
    }
  });

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
      <Breadcrumbs>
        <Crumb>
          <Link href="/data-pkl-mahasiswa">
            <CrumbLink>Data PKL Mahasiswa</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink>Jurnal Kegiatan</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Card css={{ borderRadius: "$xl", p: "$6" }}>
        <ContentJurnalKegiatan />
      </Card>
    </Flex>
  );
};
