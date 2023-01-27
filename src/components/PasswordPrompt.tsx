import { useAdminContext } from "@/context";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState, type FC } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const PasswordPrompt: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { setPassword } = useAdminContext();

    const onSubmit = (password: string) => {
        setLoading(true);
        // setPassword(password);
    };

    return (
        <>
            <Modal isOpen={true} onClose={() => { }} closeOnEsc={false} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent p="5">
                    <ModalHeader>Heslo</ModalHeader>
                    <ModalBody>
                        <InputGroup size='md'>
                            <Input type={visible ? "text" : "password"} value={input} focusBorderColor="geocaching.green.500" fontFamily="mono" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSubmit(input)} />
                            <InputRightElement>
                                <Button colorScheme="gray" px="2" size='sm' onClick={() => setVisible(current => !current)}>
                                    {visible ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button mt={3} onClick={() => onSubmit(input)} isLoading={loading}>
                            Pokračovat
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}