import { useCallback, useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import BossCastCanvas from "./BossCastCanvas";
import PlayerCastCanvas from "./PlayerCastCanvas";
import TimelineBaseCanvas from "./TimelineBaseCanvas";
import TooltipCanvas from "./common/TooltipCanvas";

const TimelineStageCanvas = ({
    offsetX, setOffsetX, handlePointerDown, combatTime,
    enemyCastsTimeline, firstBoss, selectedBossSkill, rankingData, selected, className, selectedSkill, skillList,
    timelineScaleX, setTimelineScaleX, timelineHeight,selectedTakenSkill
}) => {

    const [stageWidth, setStageWidth] = useState(window.innerWidth);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '', timestamp: '' });

    // 툴팁
    const handleMouseEnter = (e, abilityGameID, timestamp) => {
        const { x, y } = e.target.getClientRect(); // 이미지의 위치 계산
        setTooltip({ visible: true, x: x, y: y, text: `${abilityGameID}`, timestamp: `${timestamp}` });
    };
    // 툴팁
    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, text: '' });
    };

    // 컨트롤 휠 업/다운으로 확대/축소
    const handleWheel = useCallback((e) => {
        // 컨트롤 키를 누르지 않았다면 취소
        if (!e.evt.ctrlKey) {
            return;
        }

        e.evt.preventDefault();

        // 마우스 커서의 화면상 X 좌표
        const stage = e.target.getStage();
        const pointer = stage.getPointerPosition();
        const screenX = pointer.x;

        // 현재 timelineScaleX
        const oldScale = timelineScaleX;

        // 휠 방향: deltaY>0 → 축소(zoomOut), deltaY<0 → 확대(zoomIn)
        const isZoomOut = e.evt.deltaY < 0;
        const scaleBy = 1.2; // 한번에 20% 정도 확대/축소
        let newScale = isZoomOut ? oldScale * scaleBy : oldScale / scaleBy;

        // 너무 크게/작게 되는 것 방지
        if (newScale < 1) newScale = 1;
        if (newScale > 15) newScale = 15;

        // 커서가 가리키던 시간
        const time = ((screenX - offsetX) / oldScale) * 1000;

        // 현재 커서 위치
        const newOffsetX = Math.min(screenX - (time / 1000) * newScale, 0);

        stage.batchDraw();

        // state 업데이트
        setTimelineScaleX(newScale);
        setOffsetX(newOffsetX);
    }, [timelineScaleX, offsetX]);

    // 리렌더링 시 타임라인 길이 재구성
    useEffect(() => {
        const handleResize = () => {
            setStageWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>

            <Stage
                onPointerDown={handlePointerDown}
                width={stageWidth}
                height={timelineHeight}
                // State에서 관리 중인 X축 스케일과 위치 적용
                onWheel={handleWheel}
            >
                <Layer
                    x={offsetX}
                >
                    <TimelineBaseCanvas
                        combatTime={combatTime}
                        timelineScaleX={timelineScaleX}
                    />
                    <BossCastCanvas
                        enemyCastsTimeline={enemyCastsTimeline}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        firstBoss={firstBoss}
                        combatTime={combatTime}
                        selectedBossSkill={selectedBossSkill}
                        timelineScaleX={timelineScaleX}
                    />

                    <PlayerCastCanvas
                        rankingData={rankingData}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        selected={selected}
                        selectedSkill={selectedSkill}
                        selectedTakenSkill={selectedTakenSkill}
                        className={className}
                        skillList={skillList}
                        timelineScaleX={timelineScaleX}
                    />
                    <TooltipCanvas
                        x={tooltip.x}
                        y={tooltip.y}
                        text={tooltip.text}
                        timestamp={tooltip.timestamp}
                        visible={tooltip.visible}
                        offsetX={offsetX}
                        timelineHeight={timelineHeight}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default TimelineStageCanvas;