import { Card, Text, Spacer, Grid } from "@nextui-org/react";
import React from "react";

export const AktivitasIndustri = () => {
  return (
    <Card
      variant="flat"
      css={{
        bg: "#697177",
        borderRadius: "$xl",
        p: "$10",
        flex: "1 1 100%",
        justifyContent: "center",
      }}
    >
      <Text b size={14} color="white">
        AKTIVITAS
      </Text>
      <Spacer y={0.5} />
      <Grid.Container>
        <Grid xs={6}>
          <Text size={14} color="white">
            Bidang Usaha / Jasa
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            Spesialisasi Produksi / Jasa
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            Kapasitas Produksi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            Jangkauan Pemasaran
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
      </Grid.Container>
    </Card>
  );
};
