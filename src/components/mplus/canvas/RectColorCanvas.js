import { useColor } from "color-thief-react";
import { useImageCache } from "../../../hooks/useImageCache";
import { Rect } from "react-konva";

const RectColorCanvas = ({ x, y, width, height, abilityGameID, type }) => {

    const src = type === 'mplus'
        ? `${process.env.PUBLIC_URL}/images/mplus/boss/spell/${abilityGameID}.jpg`
        : `${process.env.PUBLIC_URL}/images/player/spell/${abilityGameID}.jpg`;

    const [image] = useImageCache(src);
    const { data: color } = useColor(src, 'hex', {
        crossOrigin: 'Anonymous'
    });

    // console.log(color)

    return (
        <>
            {color && (
                <Rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={color}
                    opacity={0.7}
                />
            )}
        </>
    );
}

export default RectColorCanvas;