import { Link, useNavigate } from "react-router-dom";
import { mplusDungeonList } from "../global/variable/mplusVariable";

const HeaderNav = ({ spec, dungeonId }) => {

    const navigate = useNavigate();

    const handleDungeonClick = (d) => {
        if(dungeonId != d){
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
                        className={`w-[50px] h-[50px] opacity-50 cursor-pointer
                            hover:brightness-125 hover:opacity-100 hover:border-2 hover:border-black
                            ${d == dungeonId ? 'border-2 border-black opacity-100' : ''}`} 
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