import Header from "../components/Header";
import GoogleMapSection from "../components/Home1/GoogleMapSection";
import SearchSection from "../components/Home1/SearchSection";


export default function Home() {
    return( 
        <div>
            <Header/>
            {/* Grid layout with 12 columns */}
            <div className="p-6 grid grid-cols-12 gap-5 items-start h-[80vh]">
                {/* Search component jo first 5 columns occupy karega */}
                <div className="col-span-5 h-full overflow-auto">
                    <SearchSection/>
                </div>
                {/* Google Map component jo 6th column se start hoga */}
                <div className="col-span-7 h-full">
                    <GoogleMapSection/>
                </div>
            </div>
            
        </div>
    );
}
