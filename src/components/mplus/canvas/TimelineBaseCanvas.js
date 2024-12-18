import { Group, Line, Text } from "react-konva";
import { TL_SPELL_WIDTH_PER_SEC, TL_Y_PER_LIST } from "../../../global/variable/timelineConstants";

const TimelineBaseCanvas = ({ combatTime }) => {

    const limitTimeline = combatTime / 1000 * TL_SPELL_WIDTH_PER_SEC

    // 초단위 전용 변환, 반복문을 ms로 하면 값이 너무 커져서 오류
    const convertToMMSS = (s) => {
        const minutes = Math.floor(s / 60);
        const remainingSeconds = s % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const timelineShapes = [];

    // jsx에 for문을 돌릴수없으니 선생성 후렌더
    for (let x = 0; x < limitTimeline; x += 10 * TL_SPELL_WIDTH_PER_SEC) {
        // 30의 배수인지 확인
        const isThirtyMultiple = x % 30 === 0;
        const strokeWidth = x === 0 ? 2 : 1;

        timelineShapes.push(
            <Line
                key={'timeline base line' + x}
                points={[x, isThirtyMultiple ? TL_Y_PER_LIST - 12 : TL_Y_PER_LIST - 6, x, TL_Y_PER_LIST]}
                stroke="black"
                strokeWidth={strokeWidth}
            />
        );
        if (isThirtyMultiple) {
            timelineShapes.push(
                <Text
                    key={'timeline base text' + x}
                    x={x === 0 ? x : x - 17.5}
                    y={0}
                    text={convertToMMSS(x / TL_SPELL_WIDTH_PER_SEC)}
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