import { checkPassword } from "@/client";
import { useAdminContext } from "@/context";
import { useEffect, useState, type FC } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
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

    useEffect(() => { setVisible(true); }, []);

    return (
        <>
            <Modal show={visible}>
                <Modal.Header>
                    <Modal.Title>Heslo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {error && (
                            <Alert variant="danger">
                                Nesprávné heslo
                            </Alert>
                        )}
                        <Form.Group>
                            <Form.Control type="password" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSubmit(input)} tabIndex={1}/>
                        </Form.Group>
                        <Button onClick={() => onSubmit(input)} disabled={loading} tabIndex={2} className="mt-2" variant="primary">
                            Pokračovat
                        </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}