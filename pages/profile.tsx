import React, {useCallback, useEffect} from 'react';
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import BottomTabNavigator from "@/components/bottom-tab-navigator/bottom-tab-navigator";

const Profile = () => {
    const { data, status } = useSession()
    const router = useRouter()

    const onBackClick = useCallback(() => {
        router.back()
    }, [router])

    const onLogoutClick = useCallback(() => {
        signOut().catch()
    }, [])

    return (<>
        <div className="Profile flex flex-col w-screen min-h-screen bg-green-700">
            <div className="Profile flex-col justify-start items-start inline-flex">
                <div className="BaseMenuNavigation px-6 py-2.5 flex-col justify-start items-start flex">
                    <div className="Frame33 justify-start items-center gap-5 inline-flex">
                        <div className="Frame3 justify-start items-center gap-5 flex">
                            <div onClick={onBackClick} className="IconsChevronLeft w-5 h-5 relative">
                                <img src="/base/chevron-left.svg"/>
                            </div>
                            <div className="TitleNavigation w-60 text-white text-lg font-bold font-['Inter'] leading-relaxed">Profil</div>
                        </div>
                    </div>
                </div>
                <div className="UserProfile self-stretch px-6 py-2 justify-start items-start gap-2 inline-flex">
                    <div className="PhotoProfile w-20 h-20 justify-center items-center flex">
                        <img className="Ellipse1 w-20 h-20 rounded-full" src={data?.user?.image  || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} />
                    </div>
                    <div className="Frame69 flex-col justify-start items-start gap-0.5 inline-flex">
                        <div className="User text-center text-white text-2xl font-bold font-['DM Sans']">{data?.user?.name}</div>
                        <div className="UserGmailCom text-center text-white text-sm font-normal font-['DM Sans']">{data?.user?.email}</div>
                        <div className=" text-center text-white text-sm font-normal font-['DM Sans']">0812345556</div>
                    </div>
                </div>
                <div className="Frame70 px-6 pt-4 pb-2 justify-center items-center gap-2.5 inline-flex">
                    <div className="TrackerSampah text-cyan-50 text-base font-bold font-['DM Sans']">Tracker Sampah</div>
                </div>
                <div className="Frame5006 px-7 justify-start items-start gap-2.5 inline-flex">
                    <div className="LihatSeberapaBanyakSampahYangTelahKamuOlah w-64 text-white text-xs font-normal font-['DM Sans']">Lihat seberapa banyak sampah yang telah kamu olah!</div>
                </div>
                <div className="Frame5016 max-w-full overflow-x-auto scrollbar-hide">
                    <div className="TrackerGroup self-stretch px-6 py-2 justify-start items-start gap-2 inline-flex">
                        <div className="Frame13 w-24 self-stretch px-3 py-2 bg-amber-400 rounded-lg shadow flex-col justify-start items-start gap-2 inline-flex">
                            <div className="Frame11 self-stretch h-16 flex-col justify-center items-center gap-4 flex">
                                <div className="Frame14 self-stretch h-8 py-0.5 flex-col justify-center items-start gap-2.5 flex">
                                    <div className="Frame68 justify-start items-center gap-2.5 inline-flex">
                                        <div className="Kg text-cyan-50 text-xl font-bold font-['DM Sans']">8 kg</div>
                                    </div>
                                </div>
                                <div className="Frame10 self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                                    <div className="Frame8 self-stretch h-4 flex-col justify-center items-start gap-1 flex">
                                        <div className="Plastik self-stretch text-cyan-50 text-xs font-bold font-['DM Sans']">Plastik</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame17 w-24 self-stretch px-3 py-2 bg-lime-400 rounded-lg shadow flex-col justify-start items-start gap-2 inline-flex">
                            <div className="Frame11 self-stretch h-16 flex-col justify-center items-center gap-4 flex">
                                <div className="Frame14 self-stretch h-8 py-0.5 flex-col justify-center items-start gap-2.5 flex">
                                    <div className="Frame68 justify-start items-center gap-2.5 inline-flex">
                                        <div className="Kg text-cyan-50 text-xl font-bold font-['DM Sans']">8 kg</div>
                                    </div>
                                </div>
                                <div className="Frame10 self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                                    <div className="Frame8 self-stretch h-4 flex-col justify-center items-start gap-1 flex">
                                        <div className="Botol self-stretch text-cyan-50 text-xs font-bold font-['DM Sans']">Botol</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame14 w-24 self-stretch px-3 py-2 bg-rose-400 rounded-lg shadow flex-col justify-start items-start gap-2 inline-flex">
                            <div className="Frame11 self-stretch h-16 flex-col justify-center items-center gap-4 flex">
                                <div className="Frame14 self-stretch h-8 py-0.5 flex-col justify-center items-start gap-2.5 flex">
                                    <div className="Frame68 justify-start items-center gap-2.5 inline-flex">
                                        <div className="Kg text-cyan-50 text-xl font-bold font-['DM Sans']">8 kg</div>
                                    </div>
                                </div>
                                <div className="Frame10 self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                                    <div className="Frame8 self-stretch h-4 flex-col justify-center items-start gap-1 flex">
                                        <div className="Karton self-stretch text-cyan-50 text-xs font-bold font-['DM Sans']">Karton</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame15 w-24 self-stretch px-3 py-2 bg-cyan-500 rounded-lg shadow flex-col justify-start items-start gap-2 inline-flex">
                            <div className="Frame11 self-stretch h-16 flex-col justify-center items-center gap-4 flex">
                                <div className="Frame14 self-stretch h-8 py-0.5 flex-col justify-center items-start gap-2.5 flex">
                                    <div className="Frame68 justify-start items-center gap-2.5 inline-flex">
                                        <div className="Kg text-cyan-50 text-xl font-bold font-['DM Sans']">8 kg</div>
                                    </div>
                                </div>
                                <div className="Frame10 self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                                    <div className="Frame8 self-stretch h-4 flex-col justify-center items-start gap-1 flex">
                                        <div className="Logam self-stretch text-cyan-50 text-xs font-bold font-['DM Sans']">Logam</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Frame16 w-24 self-stretch px-3 py-2 bg-lime-400 rounded-lg shadow flex-col justify-start items-start gap-2 inline-flex">
                            <div className="Frame11 self-stretch h-16 flex-col justify-center items-center gap-4 flex">
                                <div className="Frame14 self-stretch h-8 py-0.5 flex-col justify-center items-start gap-2.5 flex">
                                    <div className="Frame68 justify-start items-center gap-2.5 inline-flex">
                                        <div className="Kg text-cyan-50 text-xl font-bold font-['DM Sans']">8 kg</div>
                                    </div>
                                </div>
                                <div className="Frame10 self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                                    <div className="Frame8 self-stretch h-4 flex-col justify-center items-start gap-1 flex">
                                        <div className="Kaca self-stretch text-cyan-50 text-xs font-bold font-['DM Sans']">Kaca</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Scroll flex-1 pt-8 pb-20 px-4 bg-white rounded-t-3xl mt-4">
                {/*<div className="Rectangle124 w-96 h-96 left-[376px] top-0 absolute origin-top-left -rotate-180 bg-white rounded-tl-3xl rounded-tr-3xl" />*/}
                <div className="Frame73 h-56 flex flex-col gap-9">
                    <div className="Frame57 flex-col justify-start items-start gap-5 flex">
                        <div className="Frame71 flex-col justify-start items-start gap-5 flex">
                            <div className="Akun text-zinc-400 text-xs font-normal font-['DM Sans']">Akun</div>
                            <div className="Group2 w-80 relative">
                                <div className="Frame34 h-4 justify-start items-center gap-52 inline-flex">
                                    <div className="SettingAkun text-neutral-900 text-sm font-normal font-['DM Sans']">Setting Akun</div>
                                </div>
                                <div className="ChevronRight w-5 h-5 left-[298px] top-0 absolute flex-col justify-start items-start inline-flex" />
                            </div>
                            <div className="Frame40 flex justify-between">
                                <div className="CoinSaya text-neutral-900 text-sm font-normal font-['DM Sans']">Tukar Coin Saya</div>
                                <div className="ChevronRight w-5 h-5 relative" />
                            </div>
                        </div>
                    </div>
                    <div className="Frame72 flex-col justify-start items-start gap-5 flex">
                        <div className="PusatBantuan text-zinc-400 text-xs font-normal font-['DM Sans']">Pusat Bantuan</div>
                        <div className="Frame37 justify-start items-center gap-60 inline-flex">
                            <div className="Bantuan text-neutral-900 text-sm font-normal font-['DM Sans']">Bantuan</div>
                            <div className="ChevronRight w-5 h-5 relative" />
                        </div>
                        <div className="Frame38 justify-start items-center gap-28 inline-flex">
                            <div className="FrequentlyAskedQuestions text-neutral-900 text-sm font-normal font-['DM Sans']">Frequently asked questions</div>
                            <div className="ChevronRight w-5 h-5 relative" />
                        </div>
                    </div>
                </div>
                <div className="VersiAplikasi100 text-zinc-400 text-xs text-center mt-10 mb-2.5 font-normal font-['Poppins']">Versi Aplikasi 1.0.0</div>
                <div className="Button1 h-10">
                    <button onClick={onLogoutClick} className="Rectangle4 w-full h-10 rounded-3xl border border-green-500">
                        <div className="Keluar left-[127px] text-center text-green-500 text-sm font-semibold font-['Poppins']">Keluar</div>
                    </button>
                </div>
            </div>
        </div>
        <BottomTabNavigator />
    </>);
}

export default Profile;

Profile.auth = true
