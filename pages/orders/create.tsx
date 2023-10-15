import React, {useCallback} from 'react';
import { useSession } from "next-auth/react";
import {useRouter} from "next/router";

const OrderCreate = () => {
    const { data } = useSession()
    const router = useRouter()

    const onBackClick = useCallback(() => {
        router.back()
    }, [router])

    return (
        <div className="TukarSampah flex flex-col w-full min-h-screen bg-green-700">
            {/*<div className="Rectangle124 w-96 h-96 left-[375px] top-[114px] absolute origin-top-left -rotate-180 bg-white rounded-tl-3xl rounded-tr-3xl" />*/}
            <div className="BaseMenuNavigation px-6 py-2.5 flex-col justify-start inline-flex">
                <div className="Frame33 justify-start items-center gap-5 inline-flex">
                    <div className="Frame3 justify-start items-center gap-5 flex">
                        <div onClick={onBackClick} className="IconsChevronLeft w-5 h-5 relative">
                            <img src="/base/chevron-left.svg"/>
                        </div>
                        <div className="TitleNavigation w-60 text-white text-lg font-bold font-['Inter'] leading-relaxed">Tukar Sampah</div>
                    </div>
                </div>
            </div>
            <div className="Frame79 flex-1 mt-4 px-4 bg-white pt-8 rounded-t-3xl left-[5px] flex-col justify-start items-start gap-1 inline-flex">
                <div className="Form px-1 py-2 flex-col justify-start items-start gap-2 flex">
                    <div className="Frame78 justify-start items-start gap-2.5 inline-flex">
                        <div className="SetorSampah text-black text-base font-bold font-['DM Sans']">Setor Sampah</div>
                    </div>
                    <div className="BaseFormInput p-3.5 bg-white rounded-lg border border-zinc-400 justify-start items-start gap-2.5 inline-flex">
                        <div className="IconsTrash2 w-5 h-5 relative">
                            <img src="/base/trash-2.svg"/>
                        </div>
                        <div className="FormPlaceholder w-64 text-zinc-400 text-sm font-normal font-['DM Sans']">Pilih Jenis Sampah</div>
                    </div>
                </div>
                <div className="Form px-1 py-2 flex-col justify-start items-start gap-2 flex">
                    <div className="Frame78 justify-start items-start gap-2.5 inline-flex">
                        <div className="LokasiPengambilan text-black text-base font-bold font-['DM Sans']">Lokasi Pengambilan</div>
                    </div>
                    <div className="BaseFormInput p-3.5 bg-white rounded-lg border border-zinc-400 justify-start items-start gap-2.5 inline-flex">
                        <div className="IconsMap w-5 h-5 relative">
                            <img src="/base/map.svg" />
                        </div>
                        <div className="FormPlaceholder w-64 text-zinc-400 text-sm font-normal font-['DM Sans']">Pilih Lokasi Pengambilan</div>
                    </div>
                </div>
                <div className="Form px-1 py-2 flex-col justify-start items-start gap-2 flex">
                    <div className="Frame78 justify-start items-start gap-2.5 inline-flex">
                        <div className="WaktuPengambilan text-black text-base font-bold font-['DM Sans']">Waktu Pengambilan</div>
                    </div>
                    <div className="BaseFormInput p-3.5 bg-white rounded-lg border border-zinc-400 justify-start items-start gap-2.5 inline-flex">
                        <div className="IconsClock w-5 h-5 relative" >
                            <img src="/base/clock.svg" />
                        </div>
                        <div className="FormPlaceholder w-64 text-zinc-400 text-sm font-normal font-['DM Sans']">Atur Waktu Pick Up</div>
                    </div>
                </div>
            </div>
            <div className="Frame77 flex-col bg-white pb-8 px-4">
                <div className="Button h-12 py-3.5 bg-green-700 rounded-full shadow justify-center items-center">
                    <div className="MulaiCariPicker text-center text-white text-sm font-normal font-['DM Sans']">Jadwalkan</div>
                </div>
            </div>
        </div>
    );
}

export default OrderCreate;

OrderCreate.auth = true
