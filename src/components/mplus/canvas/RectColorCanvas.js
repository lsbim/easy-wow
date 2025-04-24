import { useColor } from "color-thief-react";
import { Rect } from "react-konva";
import { convertToSrc } from "../../../global/function";

const RectColorCanvas = ({ x, y, width, height, abilityGameID, type }) => {

    const src = convertToSrc(abilityGameID);

    const { data: color } = useColor(src, 'hex', {
        crossOrigin: 'Anonymous'
    });

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