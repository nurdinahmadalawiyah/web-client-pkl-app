import { Card, Text, Grid } from "@nextui-org/react";
import React from "react";
import { Flex } from "../../styles/flex";

export const NilaiPembimbing = ({data}) => {
  return (
    
    <Flex
      css={{
        flexWrap: "wrap",
        "@sm": {
          flexWrap: "nowrap",
        },
      }}
      direction={"row"}
    >
      <Card
        variant="flat"
        css={{
          bg: "transparent",
        }}
      >
        <Card.Body>
          <Grid.Container gap={1}>
            <Grid xs={8}>
              <Card variant="flat">
              <Card.Body>
                  <Text b size={14}>
                    Memiliki integritas yang baik di lingkungan kerja
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.integritas ? data.integritas : "-"}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1}>
            <Grid xs={8}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size={14}>
                    Mampu bekerja secara profesional sesuai bidangnya
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.profesionalitas ? data.profesionalitas : "-"}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1}>
            <Grid xs={8}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size={14}>
                    Cakap dalam berkomunikasi bahasa inggris
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.bahasa_inggris ? data.bahasa_inggris : "-"}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1}>
            <Grid xs={8}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size={14}>
                    Mampu mengaplikasikan teknologi informasi
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.teknologi_informasi ? data.teknologi_informasi : "-"}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
      <Card
        variant="flat"
        css={{
          bg: "transparent",
        }}
      >
        <Card.Body>
          <Grid.Container gap={1}>
            <Grid xs={8}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size={14}>
                    Mampu berkomunikasi dengan teman sejawat atau atasan
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.komunikasi ? data.komunikasi : "-"}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1}>
            <Grid xs={8}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size={14}>
                    Mampu bekerjasama dengan teman sejawat/tim
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.kerja_sama ? data.kerja_sama : "-"} 
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1}>
            <Grid xs={8}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size={14}>
                    Mampu mengorganisasikan pekerjaan berdasarkan visi ke depan
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.organisasi ? data.organisasi : "-"}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Flex>
  );
};
