import { Button, Card, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from 'react';
import { Flex } from "../../styles/flex";
import {
    Breadcrumbs,
    Crumb,
    CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import {FormEditMahasiswa} from "./form-edit-mahasiswa"
import { useRouter } from 'next/router';

export const EditMahasiswa = () => {
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
                    <CrumbLink href="#">Edit Data</CrumbLink>
                </Crumb>
            </Breadcrumbs>
            <Card
                css={{
                borderRadius: "$xl",
                    px: "$6",
                }}
                >
                <Card.Body css={{ py: "$10" }}>
                    <FormEditMahasiswa />
                </Card.Body>
            </Card>
        </Flex>
        );
};