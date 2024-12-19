import { useLocation, useParams } from "react-router-dom";
import MplusDefComponent from "../../components/mplus/MplusDefComponent";
import Footer from "../../layouts/Footer";
import HeaderNav from "../../layouts/HeaderNav";
import { useEffect } from "react";

const MplusDefPage = () => {
    const { spec, dungeonId } = useParams(); // URL패스파라미터
    const location = useLocation();

    const [className, specName] = spec.split("-");

    useEffect(() => {
        // Google Analytics로 페이지뷰 전송
        window.gtag('config', 'G-PW9P4267XJ', {
            page_path: location.pathname + location.search,
        });
    }, [spec]);

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