import { Button, Card, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from 'react';
import { Flex } from "../../styles/flex";
import { TablePembimbing } from "./table-pembimbing";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from 'next/router';

export const KelolaPembimbing = () => {
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || !role) {
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
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <Link href={"/kelola-pembimbing"}>
            <CrumbLink href="#">Data Pembimbing</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Text h3>Data Pembimbing</Text>
      <Card
        css={{
          borderRadius: "$xl",
          px: "$6",
        }}
      >
        <Card.Body css={{ py: "$10" }}>
          <TablePembimbing />
        </Card.Body>
      </Card>
    </Flex>
  );
};
