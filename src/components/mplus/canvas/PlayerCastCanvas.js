import React from "react";
import { Group, Rect, Text } from "react-konva";
import { convertToMMSS, convertToTimeline, timestampToPosition } from "../../../global/function";
import { TL_DURATION_RECT_HEIGHT, TL_Y_PER_LIST, TL_Y_PLAYER_RECT, TL_Y_PLAYER_TEXT } from "../../../global/variable/timelineConstants";
import ImageCanvas from "./ImageCanvas";
import RectColorCanvas from "./RectColorCanvas";

const PlayerCastCanvas = ({ rankingData, handleMouseEnter, handleMouseLeave, selected, selectedSkill, className, skillList, timelineScaleX }) => {

    return (
        <>
            {/* 플레이어 단위 */}
            {rankingData?.map((player, playerIndex) => {
                // console.log('전투시간: ',convertToMMSS(pull?.combatTime))
                const pull = player?.fights?.pulls[selected]
                const mergedPlayerCasts = pull?.events?.playerCasts?.reduce((acc, casts) => { // 플레이어 캐스트 배열 통합
                    const timeline = convertToTimeline(casts); // acc는 통합될 기준 배열, casts는 플레이어 캐스트 배열들
                    return [...acc, ...timeline];
                }, []) ?? []; // , []는 acc의 최초 선언 타입 빈 배열


                // 받은 외생기
                const mergedPlayerTakenBuffs = pull?.events?.playerTakenDef?.reduce((acc, buffs) => {
                    const timeline = convertToTimeline(buffs);
                    return [...acc, ...timeline];
                }, []) ?? [];

                // 플레이어의 생존기와 받은 외생기 배열 합치기
                const mergedEvents = [
                    ...mergedPlayerCasts,
                    ...mergedPlayerTakenBuffs
                ].sort((a, b) => a?.timestamp - b?.timestamp);

                if (!player?.fights) {
                    return (
                        <Group key={player?.name + playerIndex}
                            y={(playerIndex + 1) * TL_DURATION_RECT_HEIGHT}
                        >
                            <Text
                                x={10}
                                y={TL_Y_PLAYER_TEXT}
                                text={"WCL 오류로 데이터를 불러오지 못했습니다."}
                                fontSize={14}
                                fill="black"
                            />
                        </Group>
                    )
                }

                return (
                    <Group key={player?.name + playerIndex}
                        y={(playerIndex + 1) * TL_DURATION_RECT_HEIGHT}
                    >
                        {/* 플레이어 전투시간 박스 */}
                        <Rect
                            y={(TL_Y_PER_LIST) + 0.5}
                            width={pull?.combatTime / 1000 * timelineScaleX}
                            height={TL_DURATION_RECT_HEIGHT}
                            stroke="black"
                            strokeWidth={1}
                        />
                        {/* 플레이어 전투시간 텍스트 */}
                        <Text
                            x={pull?.combatTime / 1000 * timelineScaleX + 10}
                            y={TL_Y_PLAYER_TEXT}
                            text={convertToMMSS(pull?.combatTime)}
                            fontSize={14}
                            fill="black"
                        />

                        {/* 플레이어 캐스트 */}
                        <Group
                            clipWidth={pull?.combatTime / 1000 * timelineScaleX}
                            clipHeight={1000}>
                            {mergedEvents?.filter(c => selectedSkill.has(c?.abilityGameID))?.map((cast, playerCastIndex) => (
                                <React.Fragment key={playerCastIndex + 'cast'}>
                                    {cast?.duration >= 10 && //
                                        <RectColorCanvas
                                            x={timestampToPosition(cast?.timestamp - pull?.startTime, timelineScaleX)}
                                            y={TL_Y_PLAYER_RECT}
                                            width={cast?.duration / 1000 * timelineScaleX || 0}
                                            height={cast?.duration ? TL_DURATION_RECT_HEIGHT : 0}
                                            abilityGameID={cast?.abilityGameID}
                                            type={className}
                                        />
                                    }
                                    <Text
                                        x={timestampToPosition(cast?.timestamp - pull?.startTime, timelineScaleX) + 30}
                                        y={TL_Y_PLAYER_TEXT}
                                        text={convertToMMSS(cast?.timestamp - pull?.startTime)}
                                        fontSize={14}
                                        fill="black"
                                    />
                                </React.Fragment>

                            ))}
                        </Group>

                        {/* 플레이어 캐스트 이미지, 이미지가 Rect와 Text를 덮도록 하단에 따로 구현 */}
                        <Group
                            clipWidth={pull?.combatTime / 1000 * timelineScaleX}
                            clipHeight={1000}>
                            {mergedEvents?.filter(c => selectedSkill?.has(c?.abilityGameID))?.map((cast, playerCastIndex) => {

                                const matchSpellName = skillList?.find(skill => skill?.spellId === cast?.abilityGameID)?.spellName;

                                return (<ImageCanvas
                                    key={playerCastIndex + 'player-cast' + player?.name}
                                    abilityGameID={cast?.abilityGameID}
                                    type={className}
                                    timestamp={cast?.timestamp}
                                    startTime={pull?.startTime}
                                    onMouseEnter={(e) => handleMouseEnter(e, matchSpellName, convertToMMSS(cast?.timestamp - pull?.startTime))}
                                    onMouseLeave={handleMouseLeave}
                                    timelineScaleX={timelineScaleX}
                                />)
                            })}
                        </Group>
                    </Group>)
            })}
        </>
    );
}

export default PlayerCastCanvas;