import { Card, Row, Text, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { Paper } from "react-iconly";

export const CardDaftarHadir = () => {
  return (
    <Card
      css={{
        bg: "#F31260",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <Paper set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Daftar Hadir
          </Text>
        </Box>
      </Card.Body>
    </Card>
  );
};
