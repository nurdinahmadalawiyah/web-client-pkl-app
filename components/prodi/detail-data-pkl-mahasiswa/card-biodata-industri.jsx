import { Button, Card, Row, Text, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import { InfoCircle, Document } from "react-iconly";
import { useRouter } from "next/router";
import { CardDetailMahasiswa } from "./card-detail-mahasiswa";
import { CardDetailTempatPkl } from "./card-detail-tempat-pkl";

export const CardBiodataIndustri = () => {
  return (
    <Card
      css={{
        bg: "#0072F5",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <Document set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Biodata Industri
          </Text>
        </Box>
      </Card.Body>
    </Card>
  );
};
