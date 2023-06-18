import { Button, Card, Input, Text, Grid, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Flex } from "../../styles/flex";
import { TablePembimbingProdi } from "./table-pembimbing-prodi";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from "next/router";

export const KelolaPembimbingProdi = () => {
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
          <Link href={"/kelola-pembimbing-prodi"}>
            <CrumbLink href="#">Data Pembimbing</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Grid.Container>
        <Grid xs={6}>
          <Text h3>Data Pembimbing</Text>
        </Grid>
        <Grid xs={6}>
          <Button
            color="success"
            auto
            css={{ marginLeft: "auto" }}
            onClick={() => router.push("/tambah-pembimbing-prodi")}
          >
            <Tooltip content="Tambah Pembimbing">Tambah</Tooltip>
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
          <TablePembimbingProdi />
        </Card.Body>
      </Card>
    </Flex>
  );
};
