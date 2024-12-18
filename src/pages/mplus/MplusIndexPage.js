import MplusIndexComponent from "../../components/mplus/MplusIndexComponent";
import { mplusDungeonList } from "../../global/variable/mplusVariable";
import { FOOTER_HEIGHT } from "../../global/variable/variable";
import Footer from "../../layouts/Footer";

const MplusIndexPage = () => {
    return (
        <div className="min-h-screen flex-col flex">
            <div>
                <MplusIndexComponent />
            </div>
            <Footer />
        </div>
    );
}

export default MplusIndexPage;