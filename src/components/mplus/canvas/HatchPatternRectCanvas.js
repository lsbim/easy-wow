import { useMemo } from "react";
import { Rect } from "react-konva";

const HatchPatternRectCanvas = ({ x, y, width, height, color }) => {

    const tilesize = 8;

    const patternCanvas = useMemo(() => {
        const p = document.createElement('canvas');
        p.width = tilesize; // 패턴의 길이
        p.height = tilesize; // 패턴의 높이
        const ctx = p.getContext('2d');
        ctx.strokeStyle = 'rgba(140,140,255,0.25)'; // 패턴색깔
        ctx.lineWidth = 3; // 패턴 선의 굵기
        ctx.beginPath(); // 패턴그리기 시작
        // ↘
        ctx.moveTo(0, 0);
        ctx.lineTo(tilesize, tilesize);
        ctx.stroke(); // 패턴그리기 종료
        return p; // useMemo는 값을반환
    }, [color]);

    return (
        <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fillPatternImage={patternCanvas}
            fillPatternRepeat="repeat"
        />
    );
}

export default HatchPatternRectCanvas;