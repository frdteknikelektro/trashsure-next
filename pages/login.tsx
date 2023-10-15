// components/Login.tsx
import React, {useCallback, useEffect} from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login: React.FC = () => {
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
        if (status === "authenticated") router.push('/home').catch()
    }, [router, status]);

    const handleGoogleLogin = useCallback(() => {
        if (status === "unauthenticated") signIn('google').catch()
    }, [status]);

    return (
        <div className="Login flex flex-col w-full h-screen relative bg-green-700">
            <div className="flex flex-1 items-center justify-center">
                <img
                    className="UntitledDesign1RemovebgPreview1 w-80 h-64"
                    src="/login-hero.png"
                />
            </div>
            <div className="Frame60 w-full px-6 py-8 bg-white rounded-tl-3xl rounded-tr-3xl flex-col justify-start items-center gap-8 inline-flex">
                <div className="MasukTrashSure self-stretch text-black text-xl font-bold font-['DM Sans']">
                    Masuk Trash Sure
                </div>
                <div className="Frame66 flex-col justify-start items-center gap-10 flex">
                    <div className="TextGoogleBasic w-72 pl-4 pr-8 py-3.5 bg-white rounded-xl shadow border border-green-700 justify-start items-center gap-4 inline-flex">
                        <div className="Google w-5 h-5 pr-px justify-center items-center flex">
                            <div className="Group w-5 h-5 relative">
                                <img src="/google-logo.svg" />
                            </div>
                        </div>
                        <div onClick={handleGoogleLogin} className="ContinueWithGoogle grow shrink basis-0 text-center text-neutral-900 text-sm font-semibold font-['Inter']">
                            Masuk dengan Akun Google
                        </div>
                    </div>
                    <div className="Text relative w-full flex flex-col justify-center">
                        <div className="BelumMemilikiAkunBuatAkun text-center">
                            <span className="text-black text-sm font-normal font-['Inter'] leading-none">Belum memiliki akun? </span>
                            <span className="text-black text-sm font-bold font-['Inter'] leading-none">Buat Akun</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login
