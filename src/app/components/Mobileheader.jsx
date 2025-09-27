import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

export default function Mobileheader() {
    return (
        <div className="sticky top-0 left-0 bg-white right-0 z-50 max-w-screen  flex items-center justify-between md:hidden px-5 py-3">
            <div className="w-32 relative">
                <Image src="/FulllogoBlack .png" alt="mobile logo" className="w-full h-full" width={1573} height={512} />
            </div>
            <div className="flex items-center gap-1 text-zinc-600">
                <FaLocationDot className="text-blue-700 text-2xl" />
                <span>Ranchi, JH</span>
            </div>
        </div>
    )
}
