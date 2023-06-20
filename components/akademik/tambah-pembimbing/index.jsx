import { Button, Card, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import { Flex } from "../../styles/flex";
import {
    Breadcrumbs,
    Crumb,
    CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import {FormInputPembimbing} from "./form-input-pembimbing"
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

export const TambahPembimbing = () => {
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
                    <Link href={"/kelola-pembimbing"}>
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
                    <FormInputPembimbing />
                </Card.Body>
            </Card>
        </Flex>
        );
};