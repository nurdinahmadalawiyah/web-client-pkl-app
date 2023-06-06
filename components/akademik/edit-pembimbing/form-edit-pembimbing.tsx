import {
    Input,
    Text,
    Card,
    Spacer,
    Dropdown,
    Row,
    Button,
} from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import { ChevronDown } from "react-iconly";

export const FormEditPembimbing = () => {
    return (
        <Box
            css={{
            "& .nextui-table-container": {
                boxShadow: "none",
            },
            }}
            >
            <Text h3 css={{ml: 10}}>Edit Data Pembimbing</Text>
            <Flex
                css={{
                flexWrap: "wrap",
                    "@sm": {
                    flexWrap: "nowrap",
                    },
                }}
                direction={"row"}
                >
                <Card
                    variant="flat"
                    css={{
                    bg: "transparent",
                    }}
                    >
                    <Card.Body>
                        <Spacer y={0.4} />
                        <Input size="lg" bordered color="primary" css={{ mw: "400px" }} labelPlaceholder="Nama" />
                        <Spacer y={1.6} />
                        <Input size="lg" bordered color="primary" css={{ mw: "400px" }} labelPlaceholder="NIK" />
                        <Spacer y={1.6} />
                        <Input size="lg" bordered color="primary" css={{ mw: "400px" }} labelPlaceholder="Username" />
                        <Spacer y={1.6} />
                        <Input.Password size="lg" bordered  color="primary" css={{ mw: "400px" }} labelPlaceholder="Password" />
                    </Card.Body>
                </Card>
            </Flex>
            <Row>
                <Button auto css={{ml: 10}}>Simpan</Button>
            </Row>
        </Box>
        );
};
