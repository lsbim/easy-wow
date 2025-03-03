import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mplusDungeonList } from "../../global/variable/mplusVariable";
import { wowClassList } from "../../global/variable/wowVariable";
import { getMplusTimeline } from "../../api/mplusTimelineAPI";

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
        if (selected.dungeonId !== 0 && selected.spec !== '') {
            navigate(`/mplus/${selected?.dungeonId}/${selected?.spec}`);
        }
    }, [selected])


    return (
        <div>
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
        </div>
    );
}

export default MplusIndexComponent;