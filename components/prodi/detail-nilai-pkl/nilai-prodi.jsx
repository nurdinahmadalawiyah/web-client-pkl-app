import { Card, Text, Spacer, Grid, Loading, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Flex } from "../../styles/flex";

export const NilaiProdi = ({data}) => {
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
                    Presentasi
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.presentasi ? data.presentasi : "-"}
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
                    Dokumen
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.dokumen ? data.dokumen : "-"}
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
