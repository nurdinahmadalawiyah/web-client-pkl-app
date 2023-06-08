import { Card, Text, Table } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from 'react';
import { Flex } from "../../styles/flex";
import TablePengajuan from "./table-pengajuan";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from 'next/router';

const PengajuanPkl = () => {
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role !== "Akademik") {
      router.push("/login-akademik");
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
      justify="center"
      direction="column"
    >
      <Breadcrumbs>
        <Crumb>
          <Link href="/pengajuan-pkl">
            <CrumbLink>Pengajuan PKL</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink>List</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Text h3>Data Pengajuan PKL</Text>
      <Card
        css={{
          borderRadius: "$xl",
          px: "$6",
          mb: "$10" 
        }}
      >
        <Card.Body css={{ py: "$10" }}>
          <TablePengajuan />
        </Card.Body>
      </Card>
    </Flex>
  );
};

export default PengajuanPkl;
