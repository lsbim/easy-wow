import { Rect, Text } from "react-konva";

const TooltipCanvas = ({ x, y, visible, text, timestamp, offsetX, timelineHeight }) => {

    if (text === "null") {
        text = "";
    }

    const textLength = text?.length
    const rectWidth = timestamp?.toString().length * 14 || 0;
    const rectHeight = textLength > 1 ? 45 : 26;

    // 툴팁 위치 계산 (스테이지 경계 고려)
    const calculatePosition = () => {
        // 기본 위치
        let tooltipX = x + 30 - offsetX;
        let tooltipY = y;

        // 아래쪽 경계 확인
        if (tooltipY + rectHeight > timelineHeight) {
            tooltipY = y - 25; // 위로 이동
        }

        return { tooltipX, tooltipY };
    };

    const { tooltipX, tooltipY } = calculatePosition();

    return (
        <>
            <Rect
                x={tooltipX}
                y={tooltipY}
                width={rectWidth}
                height={rectHeight}
                fill="black"
                stroke="black"
                strokeWidth={3}
                cornerRadius={3} // 모서리 둥글게
                opacity={0.9}
                visible={visible}
            />

            {/* 텍스트 */}
            <Text
                x={tooltipX}
                y={tooltipY}
                width={rectWidth} // 정렬하기 위한 너비와 높이
                height={rectHeight}
                text={text + (textLength > 0 ? "\n\n" : "") + timestamp}
                fontSize={12}
                fill="white"
                visible={visible}
                lineHeight={0.8} // 줄 간격을 기본보다 좁게 설정
                align="center"         // 텍스트 가로 중앙 정렬
                verticalAlign="middle" // 텍스트 세로 중앙 정렬
            />
        </>
    );
}

export default TooltipCanvas;