import { PL_WIDTH } from "../../global/variable/timelineConstants";

const MplusPlayerComponent = ({ code, fightID, name, className, specName, hardModeLevel, medal, setIsModalOpen, height, index
}) => {

    const medalStar = (medal) => {
        switch (medal) {
            case "none":
                return "☠";
            case "bronze":
                return "⭐";
            case "silver":
                return "⭐";
            case "gold":
                return "⭐";
        }
    }
    // console.log(hasResourcesData)

    return (
        <div
            className="flex"
        // style={{
        //     height: isMoreInfo
        //         ? `${moreInfoHeight + 28}px`
        //         : `${height}px`
        // }}
        >
            <a
                className="block shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset] 
                hover:bg-slate-300"
                style={{ width: `${PL_WIDTH}px`, height: `${height}px` }}
                href={`https://www.warcraftlogs.com/reports/${code}#fight=${fightID}&type=damage-done`}
                target="_blank"
                rel="noopener noreferrer"
            // 새로 열린 페이지가 부모 페이지의 컨텍스트를 제어할 수 없도록 보안을 강화 (no opener)
            // 현재 페이지의 URL 정보를 새 페이지에 전달하지 않아 프라이버시 보호 (no referrer)
            >
                <div className="flex items-center text-[14px] w-full">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/player/spec/${className}${specName}.jpg`}
                        className={`block shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset]`}
                        style={{ height: `${height - 1}px` }}
                    />
                    <div className="w-full flex items-center justify-between">
                        <div className="text-ellipsis w-[80px] overflow-hidden whitespace-nowrap pl-[4px]">
                            {name}
                        </div>
                        <div className="text-[12px] w-[20px] flex justify-center">
                            +{hardModeLevel}
                        </div>
                        <div className="text-[12px] mr-[4px] w-[18px] flex justify-center">
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