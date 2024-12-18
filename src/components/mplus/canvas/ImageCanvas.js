import { Image } from "react-konva";
import { timestampToPosition } from "../../../global/function";
import { TL_Y_PER_LIST } from "../../../global/variable/timelineConstants";
import { useImageCache } from "../../../hooks/useImageCache";

const ImageCanvas = ({ abilityGameID, timestamp, startTime, onMouseEnter, onMouseLeave, type }) => {

    const src = type === 'mplus'
        ? `${process.env.PUBLIC_URL}/images/mplus/boss/spell/${abilityGameID}.jpg`
        : `${process.env.PUBLIC_URL}/images/player/spell/${abilityGameID}.jpg`;

    const [image] = useImageCache(src);

    const y = TL_Y_PER_LIST + 4.5

    return (
        <>
            {image && (
                <Image
                    image={image}
                    x={timestampToPosition(timestamp - startTime) + 3}
                    y={y}
                    width={20}
                    height={20}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    stroke="black"
                />
            )}
        </>
    );
}

export default ImageCanvas;