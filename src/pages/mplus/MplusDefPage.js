import { useLocation, useParams } from "react-router-dom";
import MplusDefComponent from "../../components/mplus/MplusDefComponent";
import Footer from "../../layouts/Footer";
import HeaderNav from "../../layouts/HeaderNav";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import { getKoClassName, getKoSpecName } from "../../global/variable/wowVariable";
import { getKoDungeonName } from "../../global/variable/mplusVariable";

const MplusDefPage = () => {
    const { spec, dungeonId } = useParams(); // URL패스파라미터
    const location = useLocation();
    const [className, specName] = spec.split("-");
    const pageTitle = getKoSpecName(className, specName) + " " + getKoClassName(className) + " vs " + getKoDungeonName(dungeonId);
    const titleHook = useTitle(pageTitle);

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
                className={className}
                specName={specName}
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