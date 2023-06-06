import { Card, Row, Text, Col } from "@nextui-org/react";
import React from "react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import { id } from "date-fns/locale/id";
import { parseISO, format } from "date-fns";

export const CardDataPengajuan = ({ data }) => {
  return (
    <Card.Body>
      <Flex>
        <Box>
          <Row>
            <Text b size={18} css={{ tt: "capitalize", color: "white" }}>
              {data.nama_perusahaan}
            </Text>
          </Row>
          <Row>
            <Text size={16} css={{ tt: "capitalize", color: "white" }}>
              {data.alamat_perusahaan}
            </Text>
          </Row>
          <Row>
            <Text size={16} css={{ tt: "capitalize", color: "white" }}>
              {data.tanggal_mulai && data.tanggal_selesai
                ? `${format(parseISO(data.tanggal_mulai), "dd MMMM yyyy", {
                    locale: id,
                  })} - ${format(
                    parseISO(data.tanggal_selesai),
                    "dd MMMM yyyy",
                    { locale: id }
                  )}`
                : ""}
            </Text>
          </Row>
        </Box>
      </Flex>
      <Card
        variant="flat"
        css={{
          bg: "$accents2",
          borderRadius: "$xl",
          flex: "1 1 100%",
          mt: 10,
        }}
      >
        <Card.Body>
          <Flex>
            <Row justify="space-between">
              <Text b size={20} css={{ tt: "uppercase", fontWeight: "bold" }}>
                STATUS
              </Text>
              <Box>
                <Row>
                  <Text
                    b
                    size={20}
                    css={{
                      tt: "uppercase",
                      fontWeight: "bold",
                      color:
                        data.status === "menunggu"
                          ? "orange"
                          : data.status === "ditolak"
                          ? "red"
                          : "green",
                    }}
                  >
                    {data.status}
                  </Text>
                </Row>
              </Box>
            </Row>
          </Flex>
        </Card.Body>
      </Card>
    </Card.Body>
  );
};
