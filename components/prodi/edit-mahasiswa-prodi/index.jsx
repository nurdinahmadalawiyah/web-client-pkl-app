import { Button, Card, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from 'react';
import { Flex } from "../../styles/flex";
import {
    Breadcrumbs,
    Crumb,
    CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { FormEditMahasiswaProdi } from "./form-edit-mahasiswa-prodi"
import { useRouter } from 'next/router';

export const EditMahasiswaProdi = () => {
    const router = useRouter();

    useEffect(() => {
       const accessToken = localStorage.getItem('accessToken');
       const role = localStorage.getItem('role');
  
       if (!accessToken || role !== "Prodi") {
          router.push('/login-prodi');
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
                    <Link href={"/kelola-mahasiswa-prodi"}>
                        <CrumbLink href="#">Data Mahasiswa</CrumbLink>
                    </Link>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <Link href={"/kelola-mahasiswa-prodi"}>
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
                    <FormEditMahasiswaProdi />
                </Card.Body>
            </Card>
        </Flex>
        );
};