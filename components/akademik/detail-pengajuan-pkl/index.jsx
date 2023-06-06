import {Card, Text} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Flex } from "../../styles/flex";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { ContentDetailPengajuanPkl } from "./content-detail-pengajuan-pkl";

export const DetailPengajuanPkl = () => {
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
