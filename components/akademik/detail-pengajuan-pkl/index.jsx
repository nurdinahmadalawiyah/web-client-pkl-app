import {Card, Text} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from 'react';
import { Flex } from "../../styles/flex";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { ContentDetailPengajuanPkl } from "./content-detail-pengajuan-pkl";
import { useRouter } from 'next/router';

export const DetailPengajuanPkl = () => {
  const router = useRouter();

  useEffect(() => {
     const accessToken = localStorage.getItem('accessToken');
     const role = localStorage.getItem('role');

     if (!accessToken || role !== "Akademik") {
        router.push('/login-akademik');
     }
  })

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
          <Link href={"/pengajuan-pkl"}>
            <CrumbLink>Pengajuan PKL</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Detail Pengajuan PKL</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Card css={{ borderRadius: "$xl", px: "$6",}}>
        <ContentDetailPengajuanPkl />
      </Card>
    </Flex>
  );
};
