import { Layer, Stage } from "react-konva";
import BossCastCanvas from "./BossCastCanvas";
import PlayerCastCanvas from "./PlayerCastCanvas";
import TimelineBaseCanvas from "./TimelineBaseCanvas";
import { useEffect, useState } from "react";
import { TL_Y_PER_LIST } from "../../../global/variable/timelineConstants";

const TimelineStageCanvas = ({
    offsetX, handleMouseDown, handleMouseEnter, handleMouseLeave, combatTime,
    enemyCastsTimeline, firstBoss, selectedBossSkill, rankingData, selected, className, selectedSkill, skillList
}) => {

    const [stageWidth, setStageWidth] = useState(window.innerWidth);
    const [stageHeight, setStageHeight] = useState(13 * TL_Y_PER_LIST + 9.5);

    // 화면 사이즈 바뀌면 리렌더링
    useEffect(() => {
        const handleResize = () => {
            setStageWidth(window.innerWidth);
            setStageHeight(13 * TL_Y_PER_LIST + 9.5);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Stage
            width={stageWidth}
            height={stageHeight}
            onMouseDown={handleMouseDown}
        >
            <Layer
                x={offsetX}
            >
                <TimelineBaseCanvas
                    combatTime={combatTime}
                />
                <BossCastCanvas
                    enemyCastsTimeline={enemyCastsTimeline}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    firstBoss={firstBoss}
                    combatTime={combatTime}
                    selectedBossSkill={selectedBossSkill}
                />

                <PlayerCastCanvas
                    rankingData={rankingData}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    selected={selected}
                    selectedSkill={selectedSkill}
                    className={className}
                    skillList={skillList}
                />
            </Layer>
        </Stage>
    );
}

export default TimelineStageCanvas;