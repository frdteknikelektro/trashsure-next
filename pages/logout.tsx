import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {signOut, useSession} from "next-auth/react";

const Logout = () => {
    const router = useRouter();
    const { status } = useSession()

    useEffect(() => {
        // Perform the logout action here, e.g., clear user session, cookies, or tokens.
        // Once the logout is successful, you can redirect the user to another page.
        if (status === "authenticated") signOut().catch()

        router.push('/login')
        // Make sure to handle the logout logic according to your authentication system.
    }, [router, status]);

    return (
        <div>
            Logging out...
            {/* You can add a loading spinner or message here */}
        </div>
    );
};

export default Logout;
