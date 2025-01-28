import { Link, useNavigate } from "react-router-dom";
import { mplusDungeonList } from "../global/variable/mplusVariable";

const HeaderNav = ({ spec, dungeonId }) => {

    const navigate = useNavigate();

    const handleDungeonClick = (d) => {
        if (dungeonId !== String(d)) {
            navigate(`/mplus/${d}/${spec}`);
        }
    }

    return (
        <div className="flex justify-between items-center py-2 mb-20 bg-slate-700 text-white">
            <Link
                to={"/"}
                className="font-bold text-[18px] ml-8 hover:text-slate-300 transition-colors duration-300">
                HOME
            </Link>
            <div className="flex mr-8">
                {mplusDungeonList.map(d => (
                    <img
                        key={d}
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/dungeon/${d}.jpg`}
                        className={`hover:brightness-150 hover:opacity-100
                            w-[50px] h-[50px] opacity-50 cursor-pointer`}
                        style={{
                            border: String(d) === dungeonId ? '4px solid white' : 'none',
                            opacity: String(d) === dungeonId ? 1 : 0.5
                        }}
                        alt={d}
                        title={d}
                        onClick={() => handleDungeonClick(d)}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeaderNav;