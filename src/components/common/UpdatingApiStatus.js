import { useEffect, useState } from "react";
import { getKoSpecName } from "../../global/variable/wowVariable";
import { getKoDungeonName, getMplusKoName } from "../../global/variable/mplusVariable";

const UpdatingApiStatus = ({ className, specName, dungeonId }) => {

    const [dots, setDots] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots % 82) + 1);
        }, 100);  // 0.5초마다 dots 업데이트

        return () => clearInterval(interval);
    }, []);

    const renderDots = () => {
        return '.'.repeat(dots);
    };

    const koSpecName = getKoSpecName(specName);
    const koDungeonName = getKoDungeonName(dungeonId);

    return (
        <div className="flex justify-center">
            <div>
                <div className="flex mb-4">
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${className}${specName}.jpg`}
                        className={`hover:brightness-125 cursor-pointer animate-pulse`}
                        style={{ height: 50 }}
                        alt={koSpecName}
                        title={koSpecName}
                    />
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/dungeon/${dungeonId}.jpg`}
                        className={`w-[50px] h-[50px] hover:brightness-125 cursor-pointer ml-2 animate-pulse`}
                        alt={koDungeonName}
                        title={koDungeonName}
                    />
                </div>
                <span className="font-bold">
                    데이터가 없습니다. 최초 데이터 받아오는 중, 최소 3분 이상 소요됩니다.
                </span>
                <div className="animate-pulse text-[18px] font-bold">
                    {renderDots()}
                </div>
            </div>
        </div>
    );
}

export default UpdatingApiStatus;