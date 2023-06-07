import {Button, Tooltip, Modal, Text} from '@nextui-org/react';
import { IconButton } from "../../table/table.styled";
import React from 'react';
import { InfoCircle } from 'react-iconly'

export const HapusPembimbing = () => {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <div>
            <Tooltip
                content="Hapus Pembimbing"
                color="error"
                onClick={handler}
                >
                <IconButton>
                    <Text b size={14} css={{ tt: "capitalize", color: "$red600" }}>
                        Hapus
                    </Text>
                </IconButton>
            </Tooltip>
            <Modal
                width="500px"
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                >
                <Modal.Header>
                    <InfoCircle set="bold" primaryColor="red" size={100} />
                </Modal.Header>
                <Modal.Body css={{textAlign: 'center'}}>
                    <Text size={20}>Yakin Ingin Menghapus Data?</Text>
                </Modal.Body>
                <Modal.Footer css={{justifyContent: "center"}}>
                    <Button color="error" onPress={closeHandler}>
                        Ya
                    </Button>
                    <Button onPress={closeHandler}>
                        Tidak
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
};
