import { useEffect, useRef, useState } from "react";
import { Circle, Group, Layer, Line, Rect, Stage, Text } from "react-konva";
import { convertToMMSS, convertToTimeline } from "../../../global/function";
import { TL_DURATION_RECT_HEIGHT } from "../../../global/variable/timelineConstants";
import BossCastCanvas from "./BossCastCanvas";
import PlayerCastCanvas from "./PlayerCastCanvas";
import TimelineBaseCanvas from "./TimelineBaseCanvas";

const ResourcesChartCanvas = ({ startTime, endTime, graphData, timelineScaleX, rankingData, className, selected, skillList
    , handleMouseEnter, handleMouseLeave, selectedBossSkill, offsetX, handlePointerDown, stageWidth, highlightTimestamp
}) => {

    const [mouseX, setMouseX] = useState(null);
    const [closestPoint, setClosestPoint] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '', timestamp: '' });

    const combatTime = endTime - startTime;

    const selectedSkill = new Set(skillList?.map(skill => skill?.spellId));

    // console.log("graphData: ", graphData)
    const bossData = rankingData[0]?.fights?.pulls[selected];
    const enemyCastsTimeline = convertToTimeline(bossData?.events?.enemyCasts); // beginCast와 cast를 duration으로 변환
    enemyCastsTimeline?.sort((a, b) => a?.timestamp - b?.timestamp);

    // console.log(rankingData, skillList, selectedBossSkill, bossData)

    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const timelineHeight = TL_DURATION_RECT_HEIGHT * 2; // 상단 타임라인 높이
    const graphHeight = height - margin.top - margin.bottom - timelineHeight;

    const yScale = (y) => {
        const maxY = 100; // 체력 최대값
        const minY = 0;   // 체력 최소값
        return height - margin.bottom - ((y - minY) / (maxY - minY)) * graphHeight;
    };

    // x, y 스케일 계산
    const xScale = (t) => {
        const timeSec = (t - startTime) / 1000;
        return timeSec * timelineScaleX;
    };

    // 선 그래프 포인트 계산
    const linePoints = [];
    for (let i = 0; i < graphData?.length; i++) {
        const [t, hp] = graphData[i];
        const x = xScale(t);
        const y = yScale(hp);

        if (i === 0) {
            // 첫 점만 linePoints에 추가
            linePoints.push(x, y);
        } else {
            const [_, prevHp] = graphData[i - 1];
            const prevY = yScale(prevHp);

            // 수평 이동
            linePoints.push(x, prevY);
            // 수직 이동
            linePoints.push(x, y);
        }
    }

    // console.log("linePoints: ", linePoints)

    const inverseXScale = (x) => {
        const timeSec = x / timelineScaleX;
        return startTime + timeSec * 1000;
    };

    const handleMouseMove = (e) => {
        const currentMouseX = e.evt.offsetX - offsetX; // Stage 기준 offsetX
        setMouseX(currentMouseX); // 마우스 X 좌표 업데이트

        const currentTimeMs = inverseXScale(currentMouseX);
        const currentSecond = Math.floor((currentTimeMs - startTime) / 1000);

        // console.log(convertToMMSS(currentTimeMs-startTime))

        const filteredData = graphData?.filter(([timeMs]) => {
            const dataSecond = Math.floor((timeMs - startTime) / 1000);
            return dataSecond === currentSecond;
        });

        if (filteredData?.length > 0) {
            // 해당 초의 첫 번째 데이터 포인트를 가장 가까운 점으로 설정 (표시는 그대로 유지)
            setClosestPoint(filteredData[0]); // [x좌표(timestamp), y좌표(현재 체력%)]
            setTooltip({
                visible: true,
                x: ((filteredData[0][0] - startTime) / 1000 * timelineScaleX) + 15,
                y: yScale(filteredData[0][1])
                , text: convertToMMSS(currentTimeMs - startTime) + '\n\n' + filteredData[0][1] + "%"
            });

        } else {
            setClosestPoint(null);
        }
    };
    // console.log(tooltip)

    const handleChartMouseLeave = () => {
        setMouseX(null); // 마우스 X 좌표 상태 초기화
        setClosestPoint(null);
        setTooltip({ visible: false, x: 0, y: 0, text: '' });
    };

    return (
        <>
            {/* 차트가 왼쪽으로 넘어갔을때, 넘어간 곳을 가리기 위해 Stage를 두 개 만들었다. */}
            <Stage x={0} width={margin.left + 1} height={height}>
                <Layer>
                    {/* Y축 레이블 */}
                    <Text
                        x={15}
                        y={height / 2}
                        text="체력"
                        fontSize={16}
                        rotation={-90}
                        align="center"
                    />
                </Layer>
            </Stage>

            <Stage
                width={window.innerWidth}
                height={height}
                onPointerDown={handlePointerDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleChartMouseLeave}
            >
                <Layer
                    x={offsetX}
                >
                    {/* X축 마우스 위치 표시 (세로선) */}
                    {mouseX !== null && (
                        <Line
                            points={[mouseX, 0, mouseX, height - margin.bottom]}
                            stroke="lightgray"
                            strokeWidth={3}
                            dash={[4, 4]}
                        />
                    )}
                    <Group
                        x={0}
                        y={height - margin.bottom - 13}
                    >
                        {/* 하단 시간 베이스 */}
                        <TimelineBaseCanvas
                            combatTime={combatTime}
                            timelineScaleX={timelineScaleX}
                            type={"down"}
                        />
                    </Group>
                    {/* 플레이어 캐스트 */}
                    <Group y={-TL_DURATION_RECT_HEIGHT + 3}>
                        <PlayerCastCanvas
                            rankingData={rankingData}
                            selected={selected}
                            selectedSkill={selectedSkill}
                            className={className}
                            skillList={skillList}
                            timelineScaleX={timelineScaleX}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                        />
                    </Group>
                    {/* 보스 캐스트 */}
                    <Group y={-TL_DURATION_RECT_HEIGHT + 3}>
                        <BossCastCanvas
                            enemyCastsTimeline={enemyCastsTimeline}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            firstBoss={bossData}
                            combatTime={bossData?.endTime - bossData?.startTime}
                            selectedBossSkill={selectedBossSkill}
                            timelineScaleX={timelineScaleX}
                        />
                    </Group>

                    <Group>
                        {/* 선 그래프 */}
                        <Line
                            points={linePoints}
                            stroke="#ff0000"
                            strokeWidth={2}
                        />
                        {/* 가장 가까운 점 표시 */}
                        {closestPoint && (
                            <Circle
                                x={xScale(closestPoint[0])}
                                y={yScale(closestPoint[1])}
                                radius={5}
                                fill="red"
                                stroke="black"
                                strokeWidth={1}
                            />
                        )}
                        {/* X축 */}
                        <Line
                            points={[
                                0
                                , height - margin.bottom
                                , combatTime / 1000 * timelineScaleX
                                , height - margin.bottom
                            ]}
                            stroke="black"
                            strokeWidth={2}
                        />
                    </Group>
                    <Group x={offsetX}>
                        {/* Y축 */}
                        <Line
                            points={[0, 0, 0, height - margin.bottom + 1]}
                            stroke="black"
                            strokeWidth={2}
                        />
                    </Group>
                    {/* 툴팁 그룹 */}
                    <Group>
                        {/* 배경 사각형 */}
                        <Rect
                            x={tooltip.x - 10}
                            y={tooltip.y - 10}
                            width={50}
                            height={45}
                            fill="black"
                            stroke="black"
                            strokeWidth={3}
                            // cornerRadius={3} // 모서리 둥글게
                            opacity={0.8}
                            visible={tooltip.visible}
                        />

                        {/* 텍스트 */}
                        <Text
                            x={tooltip.x}
                            y={tooltip.y}
                            text={tooltip.text}
                            fontSize={12}
                            fill="white"
                            visible={tooltip.visible}
                            lineHeight={0.8} // 줄 간격을 기본보다 좁게 설정 (값을 조정해보세요)
                        />
                    </Group>

                </Layer>
                <Layer x={offsetX}>

                </Layer>
            </Stage>
        </>
    );
}

export default ResourcesChartCanvas;