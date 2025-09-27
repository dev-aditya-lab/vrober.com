import MHomeCategory from "../components/MHomeCategory";
import PopularServices from "../components/PopularServices";
import SearchBar from "../components/SearchBar";

export default function Home() {
    return (
        <div>
            <SearchBar />
            <MHomeCategory />
            <PopularServices />
        </div>
    )
}
