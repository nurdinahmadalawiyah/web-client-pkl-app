import { Card, Row, Text, Col } from "@nextui-org/react";
import React from "react";
import { Flex } from "../../styles/flex";
import { Box } from "../../styles/box";
import { id } from "date-fns/locale/id";
import { parseISO, format } from "date-fns";

export const CardDetailTempatPkl = ({ data }) => {
  return (
    <Card.Body>
      <Flex>
        <Box>
          <Row>
            <Text b size={30} css={{ tt: "capitalize", color: "white" }}>
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
    </Card.Body>
  );
};
