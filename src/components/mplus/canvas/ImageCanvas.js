
import { Image } from "react-konva";
import { convertToSrc, timestampToPosition } from "../../../global/function";
import { TL_Y_PER_LIST } from "../../../global/variable/timelineConstants";
import { useImageCache } from "../../../hooks/useImageCache";

const ImageCanvas = ({ abilityGameID, timestamp, startTime, onMouseEnter, onMouseLeave, type, timelineScaleX }) => {

    const src = convertToSrc(abilityGameID);
    const [image] = useImageCache(src);

    const y = TL_Y_PER_LIST + 4.5

    return (
        <>
            {image === "broken" ? (
                <Image
                    fill={image}
                    x={timestampToPosition(timestamp - startTime, timelineScaleX) + 3}
                    y={y}
                    width={20}
                    height={20}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    stroke="black"
                />
            ) : (
                image && (
                    <Image
                        image={image}
                        x={timestampToPosition(timestamp - startTime, timelineScaleX) + 3}
                        y={y}
                        width={20}
                        height={20}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        stroke="black"
                    />
                )
            )}
        </>
    );
}

export default ImageCanvas;