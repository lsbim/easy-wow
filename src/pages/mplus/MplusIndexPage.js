import MplusIndexComponent from "../../components/mplus/MplusIndexComponent";
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