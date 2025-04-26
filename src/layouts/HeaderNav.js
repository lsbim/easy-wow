import { Link } from "react-router-dom";
import { getKoDungeonName, mplusDungeonList } from "../global/variable/mplusVariable";
import { getKoClassAndSpecName } from "../global/variable/wowVariable";

const HeaderNav = ({ spec, dungeonId, className, specName }) => {

    const url = window.location.origin;

    return (
        <div className="flex justify-between items-center py-2 mb-12 bg-slate-700 text-white overflow-x-hidden">
            <div className="flex h-full justify-center items-center">
                <Link
                    to={"/"}
                    className="font-bold text-[18px] ml-8 mr-4 hover:text-gray-300 transition-colors duration-300 items-center">
                    EASYWOW
                </Link>
                <div className="ml-4">
                    <span className={`font-bold text-${className}`}>{getKoClassAndSpecName(className, specName)}</span>
                    <span className="font-bold text-blue-50 items-center whitespace-nowrap mr-2">
                        {' vs ' + getKoDungeonName(dungeonId)}
                    </span>
                </div>
            </div>
            <div className="flex mr-8 min-w-[400px]">
                {mplusDungeonList.map(d => (
                    <Link
                        key={'headerDungeonId' + d?.id}
                        to={`${url}/mplus/${d?.id}/${className}-${specName}`}
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
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HeaderNav;