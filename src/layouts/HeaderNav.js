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
        <div className="flex justify-between items-center mt-2 mb-20">
            <Link
                to={"/"}
                className="font-bold text-[18px] ml-8">
                HOME
            </Link>
            <div className="flex mr-8">
                {mplusDungeonList.map(d => (
                    <img
                        key={d}
                        src={`${process.env.PUBLIC_URL}/images/mplus/dungeon/${d}.jpg`}
                        className={`hover:brightness-125 hover:opacity-100 hover:border-2 hover:border-black
                            w-[50px] h-[50px] opacity-50 cursor-pointer`}
                        style={{
                            border: String(d) === dungeonId ? '2px solid black' : 'none',
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