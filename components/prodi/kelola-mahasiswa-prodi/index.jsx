import {
  Button,
  Card,
  Input,
  Text,
  Grid,
  Tooltip,
  Row,
  Dropdown,
  Spacer,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Flex } from "../../styles/flex";
import { TableMahasiswaProdi } from "./tabel-mahasiswa-prodi";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from "next/router";
import axios from "axios";

export const KelolaMahasiswaProdi = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("2019");
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken || role !== "Prodi") {
      router.push("/login-prodi");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/mahasiswa/tahun_masuk`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        setServerError(true);
      }
    };

    fetchData();
  }, []);

  const handleDropdownChange = (newValue) => {
    const firstValue = [...newValue][0];
    setSelectedValue(firstValue);
    console.log("Selected value changed to:", firstValue);
  };

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
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Grid.Container>
        <Grid xs={9}>
          <Text h3>Data Mahasiswa</Text>
        </Grid>
        <Grid xs={3}>
          <Row css={{ alignItems: "center" }}>
            <Text h5>Tahun Angkatan : </Text>
          </Row>
          <Dropdown>
            <Dropdown.Button
              flat
              color="success"
              css={{ tt: "capitalize", marginLeft: "auto" }}
            >
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedValue}
              onSelectionChange={handleDropdownChange}
            >
              {serverError ? (
                <Dropdown.Item key={tahun.tahun_masuk.toString()}>
                  <Text color="error">Gagal Memuat Data</Text>
                </Dropdown.Item>
              ) : (
                data.map((tahun) => (
                  <Dropdown.Item key={tahun.tahun_masuk}>
                    {tahun.tahun_masuk.toString()}
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Spacer x={2} />
          <Button
            color="success"
            auto
            css={{ marginLeft: "auto" }}
            onClick={() => router.push("/tambah-mahasiswa-prodi")}
          >
            <Tooltip content="Tambah Mahasiswa">Tambah</Tooltip>
          </Button>
        </Grid>
      </Grid.Container>
      <Card
        css={{
          borderRadius: "$xl",
          px: "$6",
          mt: "$6",
          mb: "$10",
        }}
      >
        <Card.Body css={{ py: "$10" }}>
          <TableMahasiswaProdi selectedValue={selectedValue} />
        </Card.Body>
      </Card>
    </Flex>
  );
};
