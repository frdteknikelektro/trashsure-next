// BottomTabNavigator.tsx
import Link from 'next/link';
import {useRouter} from "next/router";
import classNames from "classnames";

const BottomTabNavigator = () => {
    const { pathname } = useRouter()

    return (
        <div className="BaseNavigation shadow-2xl border-t-[1px] border-l-[1px] border-r-[1px] rounded-t-3xl bg-white fixed bottom-0 left-0 right-0 h-16 px-20 pt-4 pb-3.5 justify-center items-center inline-flex">
            <div className="Frame34 justify-start items-start gap-9 inline-flex">
                <div className={classNames(
                    "Frame39 justify-center items-center flex",
                    pathname === '/home' ? "pl-3 pr-2.5" : "px-3.5 py-2"
                )}>
                    <Link href="/home">
                        <div className="Frame25 self-stretch flex-col justify-start items-center gap-1 inline-flex">
                            <div className="IconsHome w-5 h-5 relative">
                                {pathname === '/home' ? <img src="/icons/home-active.svg"/> : <img src="/icons/home.svg"/>}
                            </div>
                            {pathname === '/home' && <div className="Home text-center text-green-700 text-xs font-normal font-['DM Sans']">Home</div>}
                        </div>
                    </Link>
                </div>
                <div className={classNames(
                    "Frame38 justify-center items-center flex",
                    pathname === '/orders' ? "pl-3 pr-2.5" : "px-3.5 py-2"
                )}>
                    <Link href="/orders">
                        <div className="Frame26 self-stretch flex-col justify-start items-center gap-1 inline-flex">
                            <div className="IconsAccessTime24px w-5 h-5 relative" >
                                {pathname === '/orders' ? <img src="/icons/access_time-active.svg"/> : <img src="/icons/access_time.svg"/>}
                            </div>
                            {pathname === '/orders' && <div className="Order text-center text-green-700 text-xs font-normal font-['DM Sans']">Order</div>}
                        </div>
                    </Link>
                </div>
                <div className={classNames(
                    "Frame37 justify-center items-center flex",
                    pathname === '/profile' ? "pl-3 pr-2.5" : "px-3.5 py-2"
                )}>
                    <Link href="/profile">
                        <div className="Frame27 self-stretch flex-col justify-start items-center gap-1 inline-flex">
                            <div className="IconsUser w-5 h-5 relative">
                                {pathname === '/profile' ? <img src="/icons/user-active.svg"/> : <img src="/icons/user.svg"/>}
                            </div>
                        </div>
                        {pathname === '/profile' && <div className="Order text-center text-green-700 text-xs font-normal font-['DM Sans']">Profile</div>}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BottomTabNavigator;
