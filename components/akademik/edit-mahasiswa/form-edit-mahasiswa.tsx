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

export const FormEditMahasiswa = () => {
    const prodi = [
        { key: "informatika", name: "Teknik Informatika" },
        { key: "komputer", name: "Teknik Komputer" },
        { key: "Akuntansi", name: "Akuntansi" },
        ];

    return (
        <Box
            css={{
            "& .nextui-table-container": {
                boxShadow: "none",
            },
            }}
            >
            <Text h3 css={{ml: 10}}>Edit Data Mahasiswa</Text>
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
                        <Input size="lg" bordered color="primary" labelPlaceholder="Nama" />
                        <Spacer y={1.6} />
                        <Input size="lg" bordered color="primary" labelPlaceholder="NIM" />
                        <Spacer y={1.6} />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Input
                                    size="lg"
                                    bordered
                                    color="primary"
                                    labelPlaceholder="Prodi"
                                    contentRight={<ChevronDown set="bold" />}
                                />
                            </Dropdown.Trigger>
                            <Dropdown.Menu aria-label="Dynamic Actions" items={prodi}>
                                {(item) => (
                                    <Dropdown.Item
                                        key={item.key}
                                        color={item.key === "delete" ? "error" : "default"}
                                        >
                                        {item.name}
                                    </Dropdown.Item>
                                    )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Spacer y={1.6} />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Input
                                    size="lg"
                                    bordered
                                    color="primary"
                                    labelPlaceholder="Semester"
                                    contentRight={<ChevronDown set="bold" />}
                                />
                            </Dropdown.Trigger>
                            <Dropdown.Menu aria-label="Dynamic Actions" items={prodi}>
                                {(item) => (
                                    <Dropdown.Item
                                        key={item.key}
                                        color={item.key === "delete" ? "error" : "default"}
                                        >
                                        {item.name}
                                    </Dropdown.Item>
                                    )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Spacer y={1.6} />
                        <Input
                            size="lg"
                            bordered
                            color="primary"
                            type="number"
                            labelPlaceholder="Nomor HP"
                        />
                    </Card.Body>
                </Card>
                <Card
                    variant="flat"
                    css={{
                    bg: "transparent",
                    }}
                    >
                    <Card.Body>
                        <Spacer y={0.4} />
                        <Input
                            size="lg"
                            bordered
                            color="primary"
                            labelPlaceholder="Email"
                        />
                        <Spacer y={1.6} />
                        <Input
                            size="lg"
                            bordered
                            color="primary"
                            labelPlaceholder="Username"
                        />
                        <Spacer y={1.6} />
                        <Input.Password
                            size="lg"
                            bordered
                            color="primary"
                            labelPlaceholder="Password"
                        />
                    </Card.Body>
                </Card>
            </Flex>
            <Row>
                <Button auto css={{ml: 10}}>Simpan</Button>
            </Row>
        </Box>
        );
};