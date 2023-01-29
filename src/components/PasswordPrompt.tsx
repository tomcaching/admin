import { checkPassword } from "@/client";
import { useAdminContext } from "@/context";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Button, Input, InputGroup, InputRightElement, Alert, AlertIcon } from "@chakra-ui/react";
import { useState, type FC } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const PasswordPrompt: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const { setPassword } = useAdminContext();

    const onSubmit = async (password: string) => {
        setLoading(true);
        setError(false);

        const valid = await checkPassword(password);

        if (!valid) {
            setError(true);
            setLoading(false);
            return;
        }

        setPassword(password);
    };

    return (
        <>
            <Modal isOpen={true} onClose={() => { }} closeOnEsc={false} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent p="5">
                    <ModalHeader>Heslo</ModalHeader>
                    <ModalBody>
                        {error && (
                            <Alert status="error" marginBottom={2} variant="left-accent">
                                <AlertIcon/>
                                Nesprávné heslo
                            </Alert>
                        )}
                        <InputGroup size='md'>
                            <Input type={visible ? "text" : "password"} value={input} focusBorderColor="geocaching.green.500" fontFamily="mono" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSubmit(input)} tabIndex={1}/>
                            <InputRightElement>
                                <Button colorScheme="gray" px="2" size='sm' onClick={() => setVisible(current => !current)}>
                                    {visible ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button mt={3} onClick={() => onSubmit(input)} isLoading={loading} tabIndex={2}>
                            Pokračovat
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}