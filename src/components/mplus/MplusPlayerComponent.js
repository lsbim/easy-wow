import { PL_WIDTH } from "../../global/variable/timelineConstants";

const MplusPlayerComponent = ({ code, fightID, name, myClass, spec, hardModeLevel, medal, setIsModalOpen, height, index }) => {

    const medalStar = (medal) => {
        switch (medal) {
            case "none":
                return '☠';
            case "bronze":
                return "⭐";
            case "silver":
                return "⭐";
            case "gold":
                return "⭐";
        }
    }

    return (
        <div className="flex">
            <a
                className="block shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset] hover:bg-slate-300"
                style={{ height: `${height}px`, width: `${PL_WIDTH}px` }}
                href={`https://www.warcraftlogs.com/reports/${code}#fight=${fightID}&type=damage-done`}
                target="_blank"
                rel="noopener noreferrer"
            // 새로 열린 페이지가 부모 페이지의 컨텍스트를 제어할 수 없도록 보안을 강화 (no opener)
            // 현재 페이지의 URL 정보를 새 페이지에 전달하지 않아 프라이버시 보호 (no referrer)
            >
                <div className="flex-shrink-0 text-[14px] relative">
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${myClass}${spec}.jpg`}
                        className={`shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset] top-[1px] absolute`}
                        style={{ height: `${height - 1}px` }}
                        alt={spec}
                        title={spec}
                    />
                    <div className="w-full">
                        <div className="left-[30px] top-[2.5px] absolute text-ellipsis w-[80px] overflow-hidden whitespace-nowrap">
                            {name}
                        </div>
                        <div className="text-[12px] absolute right-[5px] top-[4px]">
                            +{hardModeLevel}
                            {medalStar(medal)}
                        </div>
                    </div>
                </div>
            </a>
            <div className="w-[30px] flex items-center justify-center hover:bg-slate-300 cursor-pointer shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset]"
                onClick={() => setIsModalOpen(index)}>
                📄
            </div>
        </div>
    );
}

export default MplusPlayerComponent;