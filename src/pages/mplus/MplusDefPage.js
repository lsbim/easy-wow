import { useParams } from "react-router-dom";
import MplusDefComponent from "../../components/mplus/MplusDefComponent";
import Footer from "../../layouts/Footer";
import HeaderNav from "../../layouts/HeaderNav";

const MplusDefPage = () => {
    const { spec, dungeonId } = useParams(); // URL패스파라미터

    const [className, specName] = spec.split("-");

    return (
        <div className="min-h-screen flex-col flex">
            <HeaderNav
                spec={spec}
                dungeonId={dungeonId}
            />
            <div>
                <MplusDefComponent
                    className={className}
                    specName={specName}
                    dungeonId={dungeonId}
                />
            </div>
            <Footer />
        </div>
    );
}

export default MplusDefPage;