import { Card, Text, Spacer, Grid } from "@nextui-org/react";
import React from "react";

export const IdentitasIndustri = () => {
  return (
    <Card
      variant="flat"
      css={{
        bg: "#30E3CA",
        borderRadius: "$xl",
        p: "$10",
        flex: "1 1 100%",
        marginBottom: "10px",
        justifyContent: "center",
      }}
    >
      <Text b size={14} color="white">
        IDENTITAS INDUSTRI
      </Text>
      <Spacer y={0.5} />
      <Grid.Container>
        <Grid xs={6}>
          <Text size={14} color="white">
            Nama Industri
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            Nama Direktur/Pimpinan
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            Alamat Kantor
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            No.Telepon/FAX
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            : Isi
          </Text>
        </Grid>
        <Grid xs={6}>
          <Text size={14} color="white">
            Contact Person
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
