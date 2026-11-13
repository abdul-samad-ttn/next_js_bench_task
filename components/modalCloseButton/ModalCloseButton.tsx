"use client";

import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";

const ModalCloseButton = () => {
    const router = useRouter();

    const onClick = () => {
        toast.dismiss();
        router.back();
    }

    return (
        <button type="button"
        className="absolute right-3 top-3 text-gray-500 hover:text-gray-900"
        aria-label="class"
        onClick={onClick}>
            X
        </button>
    );
};

export default ModalCloseButton;