import DesktopMessage from "../components/DesktopMessage";
import MHomeCategory from "../components/MHomeCategory";
import PopularServices from "../components/PopularServices";
import SearchBar from "../components/SearchBar";

export default function Home() {
    return (
        <>
            {/* Desktop Message - Only shown on desktop */}
            <DesktopMessage />

            {/* Mobile Content - Only shown on mobile */}
            <div className="md:hidden">
                <SearchBar />
                <MHomeCategory />
                <PopularServices />
            </div>
        </>
    )
}
