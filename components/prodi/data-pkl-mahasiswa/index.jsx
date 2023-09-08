import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Table,
  Grid,
  Dropdown,
  Button,
  Tooltip,
  Row,
  Spacer,
} from "@nextui-org/react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import Link from "next/link";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../breadcrumb/breadcrumb.styled";
import { useRouter } from "next/router";
import { TableDataPklMahasiswa } from "./table-data-pkl-mahasiswa";
import axios from "axios";

export const DataPklMahasiswa = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("2022/2023");
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
          `${process.env.API_BASE_URL}/tempat-pkl/prodi/tahun-akademik`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:  `Bearer ${localStorage.getItem("accessToken")}`,
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
          <Link href="/data-pkl-mahasiswa">
            <CrumbLink>Data PKL Mahasiswa</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink>List</CrumbLink>
        </Crumb>
      </Breadcrumbs>
      <Grid.Container>
        <Grid xs={9}>
          <Text h3>Data PKL Mahasiswa</Text>
        </Grid>
        <Grid xs={3}>
          <Row css={{ alignItems: "center" }}>
            <Text h5>Tahun Akademik : </Text>
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
                  <Dropdown.Item key={tahun.tahun_akademik}>
                    <Text color="error">Gagal Memuat Data</Text>
                  </Dropdown.Item>
                ) : (
                  data.map((tahun) => (
                    <Dropdown.Item key={tahun.tahun_akademik}>
                      {tahun.tahun_akademik}
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Grid>
      </Grid.Container>
      <Card
        css={{
          borderRadius: "$xl",
          px: "$6",
          mb: "$10",
          mt: "$6",
        }}
      >
        <Card.Body css={{ py: "$10" }}>
          <TableDataPklMahasiswa selectedValue={selectedValue} />
        </Card.Body>
      </Card>
    </Flex>
  );
};
