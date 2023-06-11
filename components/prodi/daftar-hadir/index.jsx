import { Card, Text, Spacer } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Flex } from "../../styles/flex";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from "next/router";
import { TableDaftarHadir } from "./table-daftar-hadir"

export const DaftarHadir = () => {
  const router = useRouter();
  const { nama_mahasiswa } = router.query;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role !== "Prodi") {
      router.push("/login-prodi");
    }
  }, [router]);

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
          <CrumbLink>Daftar Hadir</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Text h3>Daftar Hadir Mahasiswa {nama_mahasiswa}</Text>
      <Spacer y={0.5}  />
      <Card css={{ borderRadius: "$xl", p: "$6" }}>
        <TableDaftarHadir />
      </Card>
    </Flex>
  );
};
