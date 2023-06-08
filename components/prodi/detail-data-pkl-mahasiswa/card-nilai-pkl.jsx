import { Card, Row, Text, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { TicketStar } from "react-iconly";

export const CardNilaiPkl = () => {
  return (
    <Card
      css={{
        bg: "#F5A524",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <TicketStar set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Nilai PKL
          </Text>
        </Box>
      </Card.Body>
    </Card>
  );
};
