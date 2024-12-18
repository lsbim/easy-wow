import React from "react";
import { Group, Rect, Text } from "react-konva";
import { convertToMMSS, timestampToPosition } from "../../../global/function";
import { bannedBossSkills } from "../../../global/variable/mplusVariable";
import { TL_DURATION_RECT_HEIGHT, TL_SPELL_WIDTH_PER_SEC, TL_Y_BOSS_TEXT, TL_Y_PER_LIST } from "../../../global/variable/timelineConstants";
import ImageCanvas from "./ImageCanvas";

const BossCastCanvas = ({ enemyCastsTimeline, handleMouseEnter, handleMouseLeave, firstBoss, combatTime, selectedBossSkill }) => {

    return (
        <>
            {/* 보스캐스트 */}
            <Group>
                {/* 보스 전투시간 박스 */}
                <Rect
                    y={(TL_Y_PER_LIST) + 0.5}
                    width={combatTime / 1000 * TL_SPELL_WIDTH_PER_SEC}
                    height={TL_DURATION_RECT_HEIGHT}
                    stroke="black"
                    strokeWidth={1}
                />
                {/* 보스 전투시간 텍스트 */}
                <Text
                    x={combatTime / 1000 * TL_SPELL_WIDTH_PER_SEC + 10}
                    y={TL_Y_BOSS_TEXT}
                    text={convertToMMSS(combatTime)}
                    fontSize={14}
                    fill="black"
                />
                {/* 보스 캐스팅 박스, 텍스트 */}
                <Group
                    clipWidth={combatTime / 1000 * TL_SPELL_WIDTH_PER_SEC}
                    clipHeight={1000}>
                    {enemyCastsTimeline
                        ?.filter(c => !bannedBossSkills.includes(c.abilityGameID))
                        ?.filter(c => selectedBossSkill?.has(c?.abilityGameID))?.map((cast, enemyCastIndex) => {
                            // console.log(cast)
                            return (
                                <React.Fragment key={enemyCastIndex + 'cast'}>
                                    <Rect
                                        x={timestampToPosition(cast.timestamp - firstBoss.startTime)}
                                        y={TL_Y_PER_LIST + 1}
                                        width={cast.duration / 1000 * TL_SPELL_WIDTH_PER_SEC || 0}
                                        height={cast.duration ? TL_DURATION_RECT_HEIGHT : 0}
                                        fill='gray'
                                        opacity={0.5}
                                    />
                                    <Text
                                        x={timestampToPosition(cast.timestamp - firstBoss.startTime) + 30}
                                        y={TL_Y_BOSS_TEXT}
                                        text={convertToMMSS(cast.timestamp - firstBoss.startTime)}
                                        fontSize={14}
                                        fill="black"
                                    />
                                </React.Fragment>
                            )
                        })}
                </Group>
                {/* 보스 캐스트 이미지 */}
                <Group
                    clipWidth={combatTime / 1000 * TL_SPELL_WIDTH_PER_SEC}
                    clipHeight={1000}>
                    {enemyCastsTimeline
                        ?.filter(c => !bannedBossSkills.includes(c?.abilityGameID))
                        ?.filter(c => selectedBossSkill?.has(c?.abilityGameID))?.map((cast, enemyCastIndex) => (
                            <ImageCanvas
                                key={enemyCastIndex + 'enemy-cast' + cast?.abilityGameID}
                                abilityGameID={cast.abilityGameID}
                                type={'mplus'}
                                timestamp={cast.timestamp}
                                startTime={firstBoss.startTime}
                                onMouseEnter={(e) => handleMouseEnter(e, cast.abilityGameID, convertToMMSS(cast.timestamp - firstBoss.startTime))}
                                onMouseLeave={handleMouseLeave}
                            />
                        ))}
                </Group>
            </Group>
        </>
    );
}

export default BossCastCanvas;