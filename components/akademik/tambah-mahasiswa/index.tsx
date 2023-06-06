import { Button, Card, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Flex } from "../../styles/flex";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import {FormInputMahasiswa} from "./form-input-mahasiswa"

export const TambahMahasiswa = () => {
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
          <Link href={"/kelola-mahasiswa"}>
            <CrumbLink href="#">Data Mahasiswa</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <Link href={"/kelola-mahasiswa"}>
            <CrumbLink href="#">List</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Tambah Data</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Card
        css={{
          borderRadius: "$xl",
          px: "$6",
        }}
      >
        <Card.Body css={{ py: "$10" }}>
          <FormInputMahasiswa />
        </Card.Body>
      </Card>
    </Flex>
  );
};