import { Button, Card, Input, Text, Grid, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Flex } from "../../styles/flex";
import { TableMahasiswaProdi } from "./tabel-mahasiswa-prodi";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from "next/router";

export const KelolaMahasiswaProdi = () => {
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
          <Link href={"/kelola-mahasiswa-prodi"}>
            <CrumbLink href="#">Data Mahasiswa</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Grid.Container>
        <Grid xs={6}>
          <Text h3>Data Mahasiswa</Text>
        </Grid>
        <Grid xs={6}>
          <Button
            color="success"
            auto
            css={{ marginLeft: "auto" }}
            onClick={() => router.push("/tambah-mahasiswa-prodi")}
          >
            <Tooltip content="Tambah Mahasiswa">Tambah</Tooltip>
          </Button>
        </Grid>
      </Grid.Container>
      <Card
        css={{
          borderRadius: "$xl",
          px: "$6",
          mt: "$6",
          mb: "$10" 
        }}
      >
        <Card.Body css={{ py: "$10" }}>
          <TableMahasiswaProdi />
        </Card.Body>
      </Card>
    </Flex>
  );
};
