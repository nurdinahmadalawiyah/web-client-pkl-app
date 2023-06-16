import React, { useEffect } from "react";
import { Card, Text, Table } from "@nextui-org/react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import Link from "next/link";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from "next/router";
import { TableLowonganPkl } from "./table-lowongan-pkl"

export const LowonganPkl = () => {
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
          <Link href="/lowongan-pkl">
            <CrumbLink>Lowongan PKL</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink>List</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Card
        css={{
          borderRadius: "$xl",
          px: "$6",
          mb: "$10" 
        }}
      >
        <Card.Body css={{ py: "$10" }}>
            <TableLowonganPkl />
        </Card.Body>
      </Card>
    </Flex>
  );
};
