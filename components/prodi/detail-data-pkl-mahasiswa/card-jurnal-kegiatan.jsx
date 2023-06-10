import { Card, Text } from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { Activity } from "react-iconly";

export const CardJurnalKegiatan = () => {
  return (
    <Card
      isPressable
      isHoverable
      css={{
        bg: "#9750DD",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <Activity set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Jurnal Kegiatan
          </Text>
        </Box>
      </Card.Body>
    </Card>
  );
};
