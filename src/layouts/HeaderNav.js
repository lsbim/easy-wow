import { Link, useNavigate } from "react-router-dom";
import { getKoDungeonName, mplusDungeonList } from "../global/variable/mplusVariable";
import { getKoSpecName } from "../global/variable/wowVariable";

const HeaderNav = ({ spec, dungeonId, className, specName }) => {

    const navigate = useNavigate();

    const handleDungeonClick = (d) => {
        if (dungeonId !== String(d)) {
            navigate(`/mplus/${d}/${spec}`);
        }
    }

    const koSpecName = getKoSpecName(specName);
    const koDungeonName = getKoDungeonName(dungeonId);

    return (
        <div className="flex justify-between items-center py-2 mb-12 bg-slate-700 text-white overflow-x-hidden">
            <div className="flex h-full justify-center items-center">
                <Link
                    to={"/"}
                    className="font-bold text-[18px] ml-8 mr-4 hover:text-slate-300 transition-colors duration-300 items-center">
                    HOME
                </Link>
                <div className="flex ml-4">
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${className}${specName}.jpg`}
                        className={`w-[40px] h-[40px]`}
                        alt={koSpecName}
                        title={koSpecName}
                    />
                    <span className="font-bold flex justify-center items-center w-[30px]">vs</span>
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/dungeon/${dungeonId}.jpg`}
                        className={`w-[40px] h-[40px]`}
                        alt={koDungeonName}
                        title={koDungeonName}
                    />
                </div>
            </div>
            <div className="flex mr-8 min-w-[400px]">
                {mplusDungeonList.map(d => (
                    <div
                        key={d?.id}
                        onClick={() => handleDungeonClick(d?.id)}
                        className="relative">
                        <img
                            src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/dungeon/${d?.id}.jpg`}
                            className={`hover:brightness-150 hover:opacity-100
                                w-[50px] h-[50px] opacity-50 cursor-pointer`}
                            style={{
                                // borderBottom: String(d) === dungeonId ? '4px solid white' : 'none',
                                opacity: String(d?.id) === dungeonId ? 1 : 0.5
                            }}
                            alt={d?.koName}
                            title={d?.koName}
                        />
                        {String(d?.id) === dungeonId && (
                            <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-700 border-t-4 border-white"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeaderNav;