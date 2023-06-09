import { Card, Text } from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { Document } from "react-iconly";
import { useRouter } from "next/router";

export const CardBiodataIndustri = () => {
  const router = useRouter();

  return (
    <Card
      isPressable
      isHoverable
      css={{
        bg: "#0072F5",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
      onPress={() => router.push('/biodata-industri')}
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
