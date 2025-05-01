import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mplusDungeonList } from "../../global/variable/mplusVariable";
import { wowClassList } from "../../global/variable/wowVariable";

const MplusIndexComponent = () => {

    const [selectedDungeon, setSelectedDungeon] = useState(mplusDungeonList[0]?.id)
    const url = window.location.origin;

    const handleDungeonClick = (dungeon) => {
        setSelectedDungeon(dungeon);
    };

    useEffect(() => {
        const preloadImage = (item, type) => {
            const img = new Image();
            switch (type) {
                case "dungeon":
                    img.src = `${process.env.PUBLIC_URL}/images/mplus/dungeon/${item}.jpg`
                    break;
                case "class":
                    img.src = `${process.env.PUBLIC_URL}/images/player/spec/${item}.jpg`
                    break;
            }
        }

        mplusDungeonList?.forEach(dungeon => preloadImage(dungeon?.id, "dungeon"))
        wowClassList?.forEach(c => {
            preloadImage(c?.name, "class");

            c?.specs?.forEach(s => preloadImage(s?.name, "class"));
        })
    }, [])

    // 현재 시즌 던전Id가 아닐 경우 초기화
    useEffect(() => {
        if (!mplusDungeonList?.some(d => d.id === selectedDungeon)) {
            setSelectedDungeon(mplusDungeonList[0]?.id)
        }
    }, [selectedDungeon])

    return (
        <div className="flex sm:justify-center mt-12">
            <div className="md:w-[60%]">

                <div className="md:text-[14px] text-[12px] flex justify-center mb-8 mx-2">
                    <div>
                        <div className="md:text-[18px] text-[16px] font-bold mb-2">쐐기돌 타임라인</div>
                        <div className="">전문화별 쐐기돌 상위 10인의 보스 전투 생존기 타임라인 데이터를 제공합니다.</div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center">
                    {mplusDungeonList?.map(d => (
                        <div
                            className="border-2 border-black mx-1 mb-2 w-[60px]"
                            key={d?.id}>
                            <img
                                src={`${process.env.PUBLIC_URL}/images/mplus/dungeon/${d?.id}.jpg`}
                                className={`w-full hover:brightness-125 hover:opacity-100 
                                    cursor-pointer
                                ${selectedDungeon !== 0 && selectedDungeon === d?.id
                                        ? '' : 'opacity-50'}`}
                                alt={d?.koName}
                                title={d?.koName}
                                onClick={() => handleDungeonClick(d?.id)}
                            />
                            <div className="text-[12px] flex justify-center bg-gray-900 text-white">{d?.shortName}</div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap mt-10 mb-10 justify-center">
                    {wowClassList.map(c => (
                        <div
                            className="flex flex-col mx-1 mb-4 shadow-md w-[160px] pt-2 pb-4 rounded-e-xl rounded-tl-xl"
                            key={c?.name}
                        >
                            <div className={`bg-gray-800 flex items-center text-[14px] text-${c?.name} rounded-tl-xl shadow-lg`}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/player/spec/${c?.name}.jpg`}
                                    className={`w-[50px] h-[50px] opacity-85 rounded-tl-xl`}
                                    alt={c?.koName}
                                    title={c?.koName}
                                />
                                <span className="ml-2 brightness-110">{c?.koName}</span>
                            </div>
                            <div className="">
                                {c?.specs?.
                                    // filter(s => s.has)?.
                                    map(s => (
                                        <Link
                                            className={`flex text-[13px] items-center mt-2 ml-2 font-bold cursor-pointer max-w-[70px]`}
                                            key={s?.name}
                                            to={`${url}/mplus/${selectedDungeon}/${c?.name}-${s?.name}`}
                                        >
                                            <img
                                                src={`${process.env.PUBLIC_URL}/images/player/spec/${c?.name}${s?.name}.jpg`}
                                                className={`w-[30px] h-[30px] transition-none`}
                                                alt={s?.koName}
                                                title={s?.koName}
                                            />
                                            <span className="ml-2">
                                                {s.koName}
                                            </span>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="my-8 justify-center items-center flex min-w-[465px]">
                    <span className="mr-2">
                        오류 및 건의사항 문의
                    </span>
                    <a className="w-[34px] h-[34px]" href="https://open.kakao.com/o/s94ri9kh" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/images/kakao/kakao_btn_small.png`} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MplusIndexComponent;