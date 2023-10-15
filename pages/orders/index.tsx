import React, {useCallback} from 'react';
import { useSession } from "next-auth/react";
import {useRouter} from "next/router";

const Orders = () => {
    const { data } = useSession()
    const router = useRouter()

    const onBackClick = useCallback(() => {
        router.back()
    }, [router])

    return (
        <div className="Order flex flex-col w-full min-h-screen bg-green-700">
            {/*<div className="Rectangle124 w-96 h-96 left-[376px] top-[101px] absolute origin-top-left -rotate-180 bg-slate-100 rounded-tl-3xl rounded-tr-3xl" />*/}
            <div className="BaseMenuNavigation px-6 py-2.5 flex-col justify-start inline-flex">
                <div className="Frame33 justify-start items-center gap-5 inline-flex">
                    <div className="Frame3 justify-start items-center gap-5 flex">
                        <div onClick={onBackClick} className="IconsChevronLeft w-5 h-5 relative">
                            <img src="/base/chevron-left.svg"/>
                        </div>
                        <div className="TitleNavigation w-60 text-white text-base font-bold font-['DM Sans']">Order</div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-100 flex-1 pt-7 rounded-t-3xl">
                <div className="Frame32 flex">
                    <div className="OnGoing flex-1 text-center text-neutral-900 text-sm font-bold font-['DM Sans']">On Going</div>
                    <div className="Riwayat flex-1 text-center text-zinc-400 text-sm font-bold font-['DM Sans']">Riwayat</div>
                </div>
                <div className="Line3 w-24 relative my-4 left-[35px] origin-top-left border-2 border-stone-900"></div>
                <div className="Frame41 left-[25px] flex-col px-4 gap-2.5 flex">
                    <div className="CardPreBuild p-3.5 bg-white rounded-lg flex-col justify-start items-start gap-3.5 flex">
                        <div className="CardCardContent justify-start items-center gap-5 inline-flex">
                            <div className="Sampah w-16 h-14 px-0.5 py-1 flex-col justify-start items-start inline-flex">
                                <img className="UntitledDesign7RemovebgPreview3 self-stretch grow shrink basis-0" src="/orders/trash.png" />
                            </div>
                            <div className="CardCardTitleLight flex-col justify-start items-start gap-1.5 inline-flex">
                                <div className="CourseTitle w-48 text-neutral-900 text-xs font-bold font-['DM Sans']">Prabowo</div>
                                <div className="Mb text-zinc-400 text-xs font-bold font-['DM Sans']">No. Order: 12334456547657</div>
                                <div className="BottomSection h-3.5 justify-start items-center gap-1 inline-flex">
                                    <div className="Keterangan text-green-700 text-xs font-normal font-['DM Sans']">Picking Up</div>
                                    <div className="Deadline h-3 justify-start items-center gap-1 flex">
                                        <div className="Time w-3 h-3 pl-0.5 pr-px pt-0.5 pb-px justify-center items-center flex">
                                            <div className="IconsSchedule w-2.5 h-2.5 relative flex-col justify-start items-start flex">
                                                <div className="BoundingBox w-2.5 h-2.5 bg-stone-300" />
                                            </div>
                                        </div>
                                        <div className="Value text-neutral-900 text-xs font-bold font-['DM Sans']">08.00 - 09.00 WIB</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CardPreBuild p-3.5 bg-white rounded-lg flex-col justify-start items-start gap-3.5 flex">
                        <div className="CardCardContent justify-start items-center gap-5 inline-flex">
                            <div className="Sampah w-16 h-14 px-0.5 py-1 flex-col justify-start items-start inline-flex">
                                <img className="UntitledDesign7RemovebgPreview3 self-stretch grow shrink basis-0" src="/orders/trash.png" />
                            </div>
                            <div className="CardCardTitleLight flex-col justify-start items-start gap-1.5 inline-flex">
                                <div className="CourseTitle w-48 text-neutral-900 text-xs font-bold font-['DM Sans']">Edi Pranowo</div>
                                <div className="Mb text-zinc-400 text-xs font-bold font-['DM Sans']">No. Order: 12334456547657</div>
                                <div className="BottomSection h-3.5 justify-start items-center gap-1 inline-flex">
                                    <div className="Keterangan text-amber-400 text-xs font-normal font-['DM Sans']">Pending</div>
                                    <div className="Deadline h-3 justify-start items-center gap-1 flex">
                                        <div className="Time w-3 h-3 pl-0.5 pr-px pt-0.5 pb-px justify-center items-center flex">
                                            <div className="IconsSchedule w-2.5 h-2.5 relative flex-col justify-start items-start flex">
                                                <div className="BoundingBox w-2.5 h-2.5 bg-stone-300" />
                                            </div>
                                        </div>
                                        <div className="Value text-neutral-900 text-xs font-bold font-['DM Sans']">08.00 - 09.00 WIB</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CardPreBuild p-3.5 bg-white rounded-lg flex-col justify-start items-start gap-3.5 flex">
                        <div className="CardCardContent justify-start items-center gap-5 inline-flex">
                            <div className="Sampah w-16 h-14 px-0.5 py-1 flex-col justify-start items-start inline-flex">
                                <img className="UntitledDesign7RemovebgPreview3 self-stretch grow shrink basis-0" src="/orders/trash.png" />
                            </div>
                            <div className="CardCardTitleLight flex-col justify-start items-start gap-1.5 inline-flex">
                                <div className="CourseTitle w-48 text-neutral-900 text-xs font-bold font-['DM Sans']">Sumitro</div>
                                <div className="Mb text-zinc-400 text-xs font-bold font-['DM Sans']">No. Order: 12334456547657</div>
                                <div className="BottomSection h-3.5 justify-start items-center gap-1 inline-flex">
                                    <div className="Keterangan text-lime-400 text-xs font-normal font-['DM Sans']">On Process</div>
                                    <div className="Deadline h-3 justify-start items-center gap-1 flex">
                                        <div className="Time w-3 h-3 pl-0.5 pr-px pt-0.5 pb-px justify-center items-center flex">
                                            <div className="IconsSchedule w-2.5 h-2.5 relative flex-col justify-start items-start flex">
                                                <div className="BoundingBox w-2.5 h-2.5 bg-stone-300" />
                                            </div>
                                        </div>
                                        <div className="Value text-neutral-900 text-xs font-bold font-['DM Sans']">08.00 - 09.00 WIB</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;

Orders.auth = true
