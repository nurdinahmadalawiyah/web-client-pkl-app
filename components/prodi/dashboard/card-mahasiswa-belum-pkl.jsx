import { Card, Text, Col, Row, Spacer, Loading } from "@nextui-org/react";
import { Flex } from "../../styles/flex";
import React from "react";

export const CardMahasiswaBelumPkl = ({data}) => {
  return (
    <Card
      css={{
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
        justifyContent: "center",
      }}
    >
      <Card.Body>
        <Flex>
          <Col>
            <Row>
              <Text b size={20} css={{ tt: "capitalize", textAlign: "center", width: "100%" }}>
                Total Mahasiswa Yang Belum Melaksanakan PKL
              </Text>
            </Row>
            <Spacer y={2} />
            <Row css={{ textAlign: "center", width: "100%" }}>
              <Text b size={28} css={{ tt: "capitalize", width: "100%" }}>
              {data && data.mahasiwa_belum_pkl ? `${data.mahasiwa_belum_pkl} Orang` : <Loading size="xl" color="success" />}
              </Text>
            </Row>
          </Col>
        </Flex>
      </Card.Body>
    </Card>
  );
};
