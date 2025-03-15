import { Group, Line, Text } from "react-konva";
import { timelineScaleX, TL_Y_PER_LIST } from "../../../global/variable/timelineConstants";

const TimelineBaseCanvas = ({ combatTime, timelineScaleX }) => {

    // 기존 밀리초단위 변환이 아닌 초단위 전용 변환, 반복문을 ms로 하면 값이 너무 커져서 오류
    const convertToMMSS = (s) => {
        const minutes = Math.floor(s / 60);
        const remainingSeconds = s % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const timelineShapes = [];
    const totalSec = Math.floor(combatTime / 1000);

    // 10초 간격으로 선, 30초마다 텍스트
    for (let sec = 0; sec <= totalSec; sec += 10) {
        const x = sec * timelineScaleX;
        const isThirtyMultiple = sec % 30 === 0;

        // 선
        timelineShapes.push(
            <Line
                key={"line_" + sec}
                points={[
                    x,
                    isThirtyMultiple ? TL_Y_PER_LIST - 12 : TL_Y_PER_LIST - 6,
                    x,
                    TL_Y_PER_LIST
                ]}
                stroke="black"
                strokeWidth={isThirtyMultiple ? 2 : 1}
            />
        );

        // 텍스트 (30초마다)
        if (isThirtyMultiple) {
            timelineShapes.push(
                <Text
                    key={"text_" + sec}
                    x={x === 0 ? x : x - 17.5}
                    y={0}
                    text={convertToMMSS(sec)}
                    fontSize={14}
                    fill="black"
                />
            );
        }
    }

    return (
        <Group>
            {timelineShapes}
        </Group>
    );
}

export default TimelineBaseCanvas;