import React, {useCallback} from 'react';
import { useSession } from "next-auth/react";
import {useRouter} from "next/router";
import BottomTabNavigator from "@/components/bottom-tab-navigator/bottom-tab-navigator";

const Home = () => {
    const { data } = useSession()
    const router = useRouter()

    const onOrderCreate = useCallback(() => {
        router.push('/orders/create').catch()
    }, [router])

    return (<>
        <div className="HomeNewUser flex flex-col w-full min-h-screen bg-green-700">
            {/*<div className="Rectangle124 w-full h-96 left-[376px] top-[221px] absolute origin-top-left -rotate-180 bg-slate-100 rounded-tl-3xl rounded-tr-3xl" />*/}
            <div className="BaseProfile z-10 mx-6 mt-6 justify-start items-center gap-5 flex">
                <div className="Frame2 justify-start items-center gap-5 flex">
                    <div className="BaseProfile w-10 h-10 justify-center items-center flex">
                        <img className="Ellipse4 w-10 h-10 rounded-full" src={data?.user?.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} />
                    </div>
                    <div className="Frame1 flex-col justify-start items-start gap-0.5 inline-flex">
                        <div className="WelcomeBack text-center text-white text-xs font-bold font-['DM Sans']">Selamat Datang!</div>
                        <div className="UserFullName w-56">
                            <span className="text-white text-sm font-bold font-['DM Sans']">{data?.user?.name || ''}<br/></span>
                            <span className="text-white text-xs font-normal font-['DM Sans']">{data?.user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="CardPreBuild z-10 p-3.5 mx-6 mt-6 bg-white rounded-lg flex-col justify-start items-start gap-3.5 inline-flex shadow">
                <div className="Frame30 justify-start items-center gap-3.5 inline-flex">
                    <div className="CardCardProgress justify-start items-start gap-2.5 flex">
                        <div className="Icon p-2 bg-slate-100 rounded-lg justify-start items-center gap-2.5 flex">
                            <div className="IconsGeneratingTokens w-5 h-5 relative">
                                <img src="/home/generating-tokens.svg"/>
                            </div>
                        </div>
                        <div className="Content flex-col justify-start items-center gap-1 inline-flex">
                            <div className="CurrentBalance w-24 text-zinc-400 text-xs font-normal font-['DM Sans']">Koin Kamu</div>
                            <div className="Rp50000 w-24 text-neutral-900 text-sm font-medium font-['DM Sans']">0 Koin</div>
                        </div>
                    </div>
                </div>
                <div className="CardCardContent flex-col justify-start items-center flex">
                    <div className="CardCardTitleLight h-14 flex-col justify-start items-start gap-1.5 flex">
                        <div className="CourseTitle w-48 text-neutral-900 text-xs font-normal font-['DM Sans']">Cek Carbon Footprint-mu!</div>
                        <div className="Mb text-green-700 text-2xl font-bold font-['DM Sans']">500 kg CO2</div>
                    </div>
                </div>
            </div>
            {/*<div className="AssesmentUlang left-[256px] top-[206px] absolute text-zinc-400 text-xs font-normal font-['DM Sans']">Assesment Ulang</div>*/}
            <div className="DaurUlang bg-gray-100 pt-16 pb-14 -mt-10 px-6 left-0 rounded-t-3xl flex flex-col flex-1 justify-start items-start gap-3.5">
                <div className="MulaiDaurUlang text-neutral-900 text-base font-bold font-['DM Sans']">Mulai Daur Ulang ♻️</div>
                <div className="Frame67 px-1 py-2 justify-start items-start gap-3 inline-flex">
                    <div onClick={onOrderCreate} className="Frame13 w-36 px-3 py-2 bg-amber-400 rounded-lg shadow flex-col justify-start items-start gap-2 inline-flex">
                        <div className="Frame11 self-stretch h-20 flex-col justify-center items-center gap-2 flex">
                            <div className="Frame14 self-stretch h-9 p-0.5 flex-col justify-center items-start gap-2.5 flex">
                                <div className="IconsGeneratingTokens w-8 h-8 relative">
                                    <img src="/home/generating-tokens-white.svg" />
                                </div>
                            </div>
                            <div className="Frame10 self-stretch h-10 flex-col justify-start items-start gap-1 flex">
                                <div className="Frame8 self-stretch h-10 flex-col justify-center items-start gap-1 flex">
                                    <div className="TukarSampahJadiCoin self-stretch text-cyan-50 text-base font-bold font-['DM Sans']">Tukar Sampah Jadi Coin!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Frame14 w-36 px-3 py-2 bg-amber-400 rounded-lg shadow flex-col justify-start items-start gap-2 inline-flex">
                        <div className="Frame11 self-stretch h-20 flex-col justify-center items-center gap-2 flex">
                            <div className="Frame14 self-stretch h-9 p-0.5 flex-col justify-center items-start gap-2.5 flex">
                                <img src="/home/access-time.svg" />
                            </div>
                            <div className="Frame10 self-stretch h-10 flex-col justify-start items-start gap-1 flex">
                                <div className="Frame8 self-stretch h-10 flex-col justify-center items-start gap-1 flex">
                                    <div className="BerlanggananPickerBulanan self-stretch text-cyan-50 text-base font-bold font-['DM Sans']">Berlangganan Picker Bulanan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="BacaArtikel text-neutral-900 text-base font-bold font-['DM Sans']">Baca Artikel</div>
                <div className="Frame40 pb-4 flex-col justify-start items-start gap-6 flex">
                    <div className="Artikel min-h-24 bg-white rounded-2xl flex">
                        <img className="PexelsMaliMaeder8022212 w-40 h-24 left-0 top-0 rounded-lg" src="/home/article-1.png" />
                        <div className="Frame5014 w-40 min-h-20 px-4 left-[156.52px] top-[11px] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Frame5015 px-2 py-1 bg-green-100 rounded-sm justify-center items-center gap-2.5 inline-flex">
                                <div className="BlogArtikel text-center text-emerald-700 text-xs font-medium font-['Poppins']">Blog & Artikel</div>
                            </div>
                            <div className="TrashsureSolusiTukarSampahJadiBerkah text-neutral-700 text-xs font-bold font-['DM Sans'] line-clamp-2">TrashSure: Solusi Tukar          Sampah Jadi Berkah </div>
                            <div className="Date justify-start items-start gap-1.5 inline-flex">
                                <div className="AntDesignCalendarOutlined w-3 h-3 relative" />
                                <div className="Oktober2023 text-center text-zinc-300 text-xs font-medium font-['Poppins']">15 Oktober 2023</div>
                            </div>
                        </div>
                    </div>
                    <div className="Artikel min-h-24 bg-white rounded-2xl flex">
                        <img className="PexelsMaliMaeder8022212 w-40 h-24 left-0 top-0 rounded-lg" src="/home/article-2.png" />
                        <div className="Frame5014 w-40 min-h-20 px-4 left-[156.52px] top-[11px] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Frame5015 px-2 py-1 bg-green-100 rounded-sm justify-center items-center gap-2.5 inline-flex">
                                <div className="BlogArtikel text-center text-emerald-700 text-xs font-medium font-['Poppins']">Blog & Artikel</div>
                            </div>
                            <div className="DaurUlangSampahSelamatkanBumi w-36 text-neutral-700 text-xs font-bold font-['DM Sans'] line-clamp-2">Daur Ulang Sampah, Selamatkan Bumi</div>
                            <div className="Date justify-start items-start gap-1.5 inline-flex">
                                <div className="AntDesignCalendarOutlined w-3 h-3 relative" />
                                <div className="Oktober2023 text-center text-zinc-300 text-xs font-medium font-['Poppins']">15 Oktober 2023</div>
                            </div>
                        </div>
                    </div>
                    <div className="Artikel min-h-24 bg-white rounded-2xl flex">
                        <img className="PexelsMaliMaeder8022212 w-40 h-24 left-0 top-0 rounded-lg" src="/home/article-3.png" />
                        <div className="Frame5014 w-40 min-h-20 px-4 left-[156.52px] top-[11px] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Frame5015 px-2 py-1 bg-green-100 rounded-sm justify-center items-center gap-2.5 inline-flex">
                                <div className="BlogArtikel text-center text-emerald-700 text-xs font-medium font-['Poppins']">Blog & Artikel</div>
                            </div>
                            <div className="TrashsureSolusiTukarSampahJadiBerkah text-neutral-700 text-xs font-bold font-['DM Sans'] line-clamp-2">TrashSure: Solusi Tukar          Sampah Jadi Berkah </div>
                            <div className="Date justify-start items-start gap-1.5 inline-flex">
                                <div className="AntDesignCalendarOutlined w-3 h-3 relative" />
                                <div className="Oktober2023 text-center text-zinc-300 text-xs font-medium font-['Poppins']">15 Oktober 2023</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomTabNavigator />
    </>);
}

export default Home;

Home.auth = true
