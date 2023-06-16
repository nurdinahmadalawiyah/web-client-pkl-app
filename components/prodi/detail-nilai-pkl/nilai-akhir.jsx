import { Card, Text, Grid} from "@nextui-org/react";
import React from "react";
import { Flex } from "../../styles/flex";

export const NilaiAkhir = ({data}) => {
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
                  <Text b size='$xl' align="center">
                    NILAI AKHIR
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.nilai_akhir ? data.nilai_akhir : "-"}
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
                  <Text b size='$xl' align="center">
                    NILAI HURUF
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="flat">
                <Card.Body>
                  <Text b size="$xl" align="center">
                    {data.nilai_huruf ? data.nilai_huruf : "-"}
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
