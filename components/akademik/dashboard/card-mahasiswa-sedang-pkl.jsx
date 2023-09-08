import { Card, Text, Col, Row, Spacer, Loading} from "@nextui-org/react";
import { Flex } from "../../styles/flex";
import React  from "react";

export const CardMahasiswaSedangPkl = ({data}) => {
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
                Mahasiswa Yang Sedang/Telah Melaksanakan PKL
              </Text>
            </Row>
            <Spacer y={2} />
            <Row css={{ textAlign: "center", width: "100%" }}>
              <Text b size={28} css={{ tt: "capitalize", width: "100%" }}>
                {data && data.mahasiswa_sedang_pkl !== null && data.mahasiswa_sedang_pkl !== undefined
                  ? `${data.mahasiswa_sedang_pkl} Orang`
                  : <Loading size="xl" color="primary" />
                }
              </Text>
            </Row>
          </Col>
        </Flex>
      </Card.Body>
    </Card>
  );
};
