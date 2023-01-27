import { useAdminContext } from "@/context";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState, type FC } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const PasswordPrompt: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    const { setPassword } = useAdminContext();

    const onSubmit = (password: string) => {
        setPassword(password);
    };

    return (
        <>
            <Modal isOpen={true} onClose={() => { }} closeOnEsc={false} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent p="5">
                    <ModalHeader>Heslo</ModalHeader>
                    <ModalBody>
                        <InputGroup size='md'>
                            <Input type={visible ? "text" : "password"} value={input} focusBorderColor="geocaching.green" fontFamily="mono" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSubmit(input)} />
                            <InputRightElement>
                                <Button px="2" size='sm' onClick={() => setVisible(current => !current)}>
                                    {visible ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button variant="geocaching" mt={3} onClick={() => onSubmit(input)}>
                            Pokračovat
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}