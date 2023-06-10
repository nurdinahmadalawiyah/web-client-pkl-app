import { Card, Text, Spacer, Table } from "@nextui-org/react";
import React from "react";

export const TenagaKerjaIndustri = ({ data }) => {
  return (
    <Card
      variant="flat"
      css={{
        borderRadius: "$xl",
        flex: "1 1 100%",
        p: "$10",
      }}
    >
      <Text b size={14}>
        TENAGA KERJA
      </Text>
      <Spacer y={0.5} />
      <Table
        bordered
        lined
        headerLined
        shadow={false}
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>TINGKAT PENDIDIDIKAN</Table.Column>
          <Table.Column>JUMLAH</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key="1">
            <Table.Cell>SD</Table.Cell>
            <Table.Cell>{data.jumlah_tenaga_kerja_sd}</Table.Cell>
          </Table.Row>
          <Table.Row key="2">
            <Table.Cell>SLTP</Table.Cell>
            <Table.Cell>{data.jumlah_tenaga_kerja_sltp}</Table.Cell>
          </Table.Row>
          <Table.Row key="3">
            <Table.Cell>SMK/STM/SMEA/SMKK/SMTK</Table.Cell>
            <Table.Cell>
              {data.jumlah_tenaga_kerja_smk +
                data.jumlah_tenaga_kerja_smea +
                data.jumlah_tenaga_kerja_smkk}
            </Table.Cell>
          </Table.Row>
          <Table.Row key="4">
            <Table.Cell>SLTA Non SMK</Table.Cell>
            <Table.Cell>{data.jumlah_tenaga_kerja_slta}</Table.Cell>
          </Table.Row>
          <Table.Row key="5">
            <Table.Cell>Sarjana Muda</Table.Cell>
            <Table.Cell>{data.jumlah_tenaga_kerja_sarjana_muda}</Table.Cell>
          </Table.Row>
          <Table.Row key="6">
            <Table.Cell>Sarjana Magister</Table.Cell>
            <Table.Cell>{data.jumlah_tenaga_kerja_sarjana_magister}</Table.Cell>
          </Table.Row>
          <Table.Row key="7">
            <Table.Cell>Doktor</Table.Cell>
            <Table.Cell>{data.jumlah_tenaga_kerja_sarjana_doktor}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Spacer y={0.5} />
      <Text b size={12}>
        Jumlah Tenaga Kerja :{" "}
        {data.jumlah_tenaga_kerja_sd +
          data.jumlah_tenaga_kerja_sltp +
          data.jumlah_tenaga_kerja_smk +
          data.jumlah_tenaga_kerja_smea +
          data.jumlah_tenaga_kerja_smkk +
          data.jumlah_tenaga_kerja_slta +
          data.jumlah_tenaga_kerja_sarjana_muda +
          data.jumlah_tenaga_kerja_sarjana_magister +
          data.jumlah_tenaga_kerja_sarjana_doktor} Orang
      </Text>
    </Card>
  );
};
