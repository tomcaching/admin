import { GeocacheDto } from "@/types";
import { createContext, useContext } from "react"

export type AdminContextState = {
    password: string | null;
    setPassword: (password: string) => void;
};

export const AdminContext = createContext<AdminContextState | null>(null);

export const useAdminContext = (): AdminContextState => {
    const context = useContext(AdminContext);

    if (context == null) {
        throw "AdminContext is null!";
    }

    return context as AdminContextState;
}