import { Card, Row, Text, Col } from "@nextui-org/react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import React from "react";
import { MahasiswaIcon } from "./mahasiswa-icon";

export const CardMahasiswa = ({ data }) => {
  return (
    <Card.Body>
      <Flex>
        <Box
          css={{
            p: 5,
            marginRight: 15,
          }}
        >
          <MahasiswaIcon />
        </Box>
        <Col>
          <Row>
            <Text b size={24} css={{ tt: "capitalize", color: "white" }}>
              {data.nama}
            </Text>
          </Row>
          <Row>
            <Text b size={16} css={{ tt: "capitalize", color: "white" }}>
              {data.nama_prodi}
            </Text>
          </Row>
          <Row>
            <Text size={16} css={{ tt: "capitalize", color: "white" }}>
              {data.nim}
            </Text>
          </Row>
        </Col>
      </Flex>
    </Card.Body>
  );
};
