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
import { ContentCatatanKhusus } from "./content-catatan-khusus"

export const CatatanKhusus = () => {
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
          <CrumbLink>Catatan Khusus</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Card css={{ borderRadius: "$xl", p: "$6" }}>
        <ContentCatatanKhusus />
      </Card>
    </Flex>
  );
};
