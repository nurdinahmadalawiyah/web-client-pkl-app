import React, { useEffect } from "react";
import {
  Card,
  Text,
  Table,
  Grid,
  Dropdown,
  Button,
  Tooltip,
  Row,
  Spacer
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

export const DataPklMahasiswa = () => {
  const router = useRouter();
  const [selected, setSelected] = React.useState(new Set(["2019/2020"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

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
              <Dropdown.Button flat color="success" css={{ tt: "capitalize", marginLeft: "auto" }}>
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="success"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
              >
                <Dropdown.Item key="2019/2020">2019/2020</Dropdown.Item>
                <Dropdown.Item key="2020/2021">2020/2021</Dropdown.Item>
                <Dropdown.Item key="2021/2022">2021/2022</Dropdown.Item>
                <Dropdown.Item key="2022/2023">2022/2023</Dropdown.Item>
                <Dropdown.Item key="2023/2024">2023/2024</Dropdown.Item>
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
          mt: "$6"
        }}
      >
        <Card.Body css={{ py: "$10" }}>
          <TableDataPklMahasiswa />
        </Card.Body>
      </Card>
    </Flex>
  );
};
