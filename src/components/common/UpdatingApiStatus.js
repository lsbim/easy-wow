import { useEffect, useState } from "react";

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

    return (
        <div className="flex justify-center">
            <div>
                <div className="flex mb-4">
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${className}${specName}.jpg`}
                        className={`hover:brightness-125 cursor-pointer animate-pulse`}
                        style={{ height: 50 }}
                        alt={specName}
                        title={specName}
                    />
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/dungeon/${dungeonId}.jpg`}
                        className={`w-[50px] h-[50px] hover:brightness-125 cursor-pointer ml-2 animate-pulse`}
                        alt={dungeonId}
                        title={dungeonId}
                    />
                </div>
                <span className="font-bold">
                    새로운 정보를 받아오는 중입니다. 약 2분의 시간 소요
                </span>
                <div className="animate-pulse text-[18px] font-bold">
                    {renderDots()}
                </div>
            </div>
        </div>
    );
}

export default UpdatingApiStatus;