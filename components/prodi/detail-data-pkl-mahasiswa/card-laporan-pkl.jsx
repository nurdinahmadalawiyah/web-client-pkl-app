import { Card, Text } from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { Upload } from "react-iconly";

export const CardLaporanPkl = () => {
  return (
    <Card
      isPressable
      isHoverable
      css={{
        bg: "#17C964",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <Upload set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Laporan PKL
          </Text>
        </Box>
      </Card.Body>
    </Card>
  );
};
