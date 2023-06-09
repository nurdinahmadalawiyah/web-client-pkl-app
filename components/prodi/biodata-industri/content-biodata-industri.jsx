import { Card, Text, Spacer, Grid } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Flex } from "../../styles/flex";
import { useRouter } from "next/router";
import { IdentitasIndustri } from "./identitas-industri";
import { AktivitasIndustri } from "./aktivitas-industri";
import { TenagaKerjaIndustri } from "./tenaga-kerja-industri";

export const ContentBiodataIndustri = () => {
  const router = useRouter();
  const { data } = router.query;

  return (
    <Card.Body css={{ py: "$10" }}>
      <Text h3 css={{ ml: "$10" }}>
        Biodata Industri
      </Text>
      <Spacer y={1} />
      <Flex
        css={{
          gap: "$10",
          flexWrap: "wrap",
          justifyContent: "center",
          "@sm": {
            flexWrap: "nowrap",
          },
        }}
        direction={"row"}
      >
        <Flex
          css={{
            gap: "$10",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <IdentitasIndustri />
          <AktivitasIndustri />
        </Flex>

        <TenagaKerjaIndustri />
      </Flex>
    </Card.Body>
  );
};
