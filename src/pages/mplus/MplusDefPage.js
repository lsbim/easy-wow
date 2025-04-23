import { useLocation, useNavigate, useParams } from "react-router-dom";
import MplusDefComponent from "../../components/mplus/MplusDefComponent";
import Footer from "../../layouts/Footer";
import HeaderNav from "../../layouts/HeaderNav";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import { getKoClassName, getKoSpecName, wowClassList } from "../../global/variable/wowVariable";
import { getKoDungeonName, mplusDungeonList } from "../../global/variable/mplusVariable";

const validSpecs = new Set(
    wowClassList.flatMap(c =>
      c.specs.map(s => `${c.name}-${s.name}`)
    )
  );

  const validDungeon = new Set(
    mplusDungeonList.flatMap(d => d.id)
  );

const MplusDefPage = () => {
    const { spec, dungeonId } = useParams(); // URL패스파라미터
    const location = useLocation();
    const nav = useNavigate();
    const [className, specName] = spec.split("-");
    const pageTitle = getKoSpecName(className, specName) + " " + getKoClassName(className) + " vs " + getKoDungeonName(dungeonId);
    const titleHook = useTitle(pageTitle);

    useEffect(() => {
        // 필수 파라미터 체크
        if (!dungeonId || !className || !specName || isNaN(Number(dungeonId))) {
            console.log("파라미터가 올바르지 않음.")
          return nav("/", { replace: true });
        }
        // 조합 유효성 검사
        if (!validSpecs.has(`${className}-${specName}`)) {
            console.log("유효하지 않음.", `${className}-${specName}`)
          return nav("/", { replace: true });
        }
        // 던전id 유효성 검사
        if (!validDungeon.has(Number(dungeonId))) {
            console.log("유효하지 않음.", dungeonId)
          return nav("/", { replace: true });
        }
      }, [dungeonId, className, specName, nav]);

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
            <div className="mb-8">
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