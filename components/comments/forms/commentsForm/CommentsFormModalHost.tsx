"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CommentsForm from "./CommentsForm";
import { useRouter } from "next/navigation";

interface CommentsFormModalHostProps {
    postsId: string;
}

const CommentsFormModalHost = ({ postsId }: CommentsFormModalHostProps) => {

    const pathname = usePathname();
    const [formKey, setFormKey] = useState(0);
    const router = useRouter();

    useEffect(()=>{
        if(pathname.endsWith("/comments/new")) {
            setFormKey(Number(crypto.randomUUID()));
        }
    },[pathname]);

    const handleSuccess = () => {
        setFormKey(Number(crypto.randomUUID()));
        router.back();
    }

    return (
        <CommentsForm key={formKey} postsId={postsId} onSuccess={handleSuccess}/>
    );
};

export default CommentsFormModalHost;