import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mplusDungeonList } from "../../global/variable/mplusVariable";
import { wowClassList } from "../../global/variable/wowVariable";

const MplusIndexComponent = () => {

    const [selected, setSelected] = useState({ dungeonId: 0, spec: '' })
    const navigate = useNavigate();

    const handleDungeonClick = (dungeon) => {
        setSelected((prevSelected) => ({
            ...prevSelected,
            dungeonId: dungeon,
        }));
    };

    const handleSpecClick = (spec) => {
        setSelected((prevSelected) => ({
            ...prevSelected,
            spec: spec,
        }));
    };

    useEffect(() => {
        const preloadImage = (item, type) => {
            const img = new Image();
            switch (type) {
                case "dungeon":
                    img.src = `${process.env.REACT_APP_IMAGES_IP}/images/mplus/dungeon/${item}.jpg`
                    break;
                case "class":
                    img.src = `${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${item}.jpg`
                    break;
            }
        }

        mplusDungeonList?.forEach(dungeon => preloadImage(dungeon?.id, "dungeon"))
        wowClassList?.forEach(c => {
            preloadImage(c?.name, "class");

            c?.specs?.forEach(s => preloadImage(s?.name), "class");
        })
    }, [])

    useEffect(() => {
        if (selected?.dungeonId !== 0 && selected?.spec !== '') {
            navigate(`/mplus/${selected?.dungeonId}/${selected?.spec}`);
        }
    }, [selected])

    return (
        <div className="flex justify-center mt-12">
            <div className="w-[60%]">
                <div className="flex">
                    {mplusDungeonList.map(d => (
                        <img
                            key={d?.id}
                            src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/dungeon/${d?.id}.jpg`}
                            className={`w-[50px] h-[50px] hover:brightness-125 cursor-pointer ml-2
                            ${selected?.dungeonId !== 0 && selected?.dungeonId === d?.id
                                    ? 'border-2 border-black' : 'opacity-50'}`}
                            alt={d?.koName}
                            title={d?.koName}
                            onClick={() => handleDungeonClick(d?.id)}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap mt-10">
                    {wowClassList.map(c => (
                        <div className="flex flex-col items-center ml-2 mb-2" key={c?.name}>
                            <img
                                src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${c?.name}.jpg`}
                                className={`w-[50px] h-[50px] opacity-70`}
                                alt={c?.name}
                                title={c?.name}
                            />
                            <div className="">
                                {c?.specs?.
                                    // filter(s => s.has)?.
                                    map(s => (
                                        <img
                                            key={s?.name}
                                            src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${c?.name}${s?.name}.jpg`}
                                            className={`w-[30px] h-[30px] mt-2 transition-none
                                        ${s ?
                                                    // s?.has ? 
                                                    // 커서-포인터를 기본에 두니 !has도 계속 포인터로 나옴
                                                    selected?.spec !== '' && selected?.spec === c?.name + '-' + s?.name
                                                        ? 'border-2 border-black hover:brightness-125 cursor-pointer'
                                                        : 'opacity-70 hover:brightness-125 cursor-pointer'
                                                    : 'grayscale opacity-50'}`}
                                            alt={s?.name}
                                            title={s?.name}
                                            onClick={() => {
                                                // s?.has && 
                                                handleSpecClick(c?.name + '-' + s?.name)
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-[12px] flex justify-center">
                    <div>던전, 전문화별 타임라인 상위 10인의 생존기 타임라인 데이터를 제공합니다.</div>
                </div>

                <div className="my-8 justify-center flex">
                    <a className="w-[34px] h-[34px]" href="https://open.kakao.com/o/s94ri9kh">
                        <img src={`${process.env.REACT_APP_IMAGES_IP}/images/kakao/kakao_btn_small.png`} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MplusIndexComponent;