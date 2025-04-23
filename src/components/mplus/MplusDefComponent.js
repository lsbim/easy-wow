import React, { useCallback, useEffect, useState } from 'react';
import { convertToMMSS, convertToTimeline } from '../../global/function';
import { PL_WIDTH, TL_DURATION_RECT_HEIGHT, TL_Y_PER_LIST } from '../../global/variable/timelineConstants';
import { useFetch } from '../../hooks/useFetch';
import useStagePointerDrag from '../../hooks/useStagePointerDrag';
import UpdatingApiStatus from '../common/UpdatingApiStatus';
import TimelineStageCanvas from './canvas/TimelineStageCanvas';
import MplusMRTModalComponent from './common/MplusMRTModalComponent';
import MplusPlayerComponent from './MplusPlayerComponent';
import MplusSkillCheckComponent from './MplusSkillCheckComponent';

const MplusDefComponent = ({ className, specName, dungeonId }) => {

    const [data, isLoading, bossList, initSelectedSkill, initSelectedBossSkill, initTimelineHeight] =
        useFetch({ dungeonId, className, specName })
    const [selected, setSelected] = useState(0); // 선택한 pull 인덱스
    const [selectedSkill, setSelectedSkill] = useState(new Set()); // 타임라인에 표기할 플레이어가 사용한 스킬들
    const [selectedTakenSkill, setSelectedTakenSkill] = useState(new Set()); // 플레이어가 받은 스킬들
    const [selectedBossSkill, setSelectedBossSkill] = useState(new Set()); // 보스가 사용한 스킬들
    const [offsetX, setOffsetX, handlePointerDown] = useStagePointerDrag();
    const [isModalOpen, setIsModalOpen] = useState(-1);
    const [timelineScaleX, setTimelineScaleX] = useState(6); // 타임라인 시간(초)과 간격(픽셀)의 비율
    const [timelineHeight, setTimelineHeight] = useState(26);

    // 보스선택
    const handleSelectBoss = (i) => {
        setOffsetX(0) // 보스 바꾸면 위치 초기화
        setTimelineScaleX(6) // 보스 바꾸면 간격초기화
        setSelected(i)
    }
    // 스킬 표시 on/off
    const handleSelectSkill = useCallback((i, type) => {
        if (type === 'player') {
            setSelectedSkill((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(i)) {
                    newSet.delete(i);
                } else {
                    newSet.add(i);
                }
                return newSet;
            })
        } else if (type === 'boss') {
            setSelectedBossSkill((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(i)) {
                    newSet.delete(i);
                } else {
                    newSet.add(i);
                }
                return newSet;
            })
        } else if(type === 'taken'){
            setSelectedTakenSkill((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(i)) {
                    newSet.delete(i);
                } else {
                    newSet.add(i);
                }
                return newSet;
            })
        }
    }, [selectedSkill])

    const handleSelectBloodlust = useCallback(() => {
        const isSelectBlood = data?.takenBloodlusts?.every( // 전부 포함됐는지?
            spell => selectedTakenSkill?.has(spell.spellId)
        );

        const newSelectedTakenSkill = new Set(selectedTakenSkill);

        if (isSelectBlood) {
            // 모두 포함되어 있으면, 해당 spellId들만 제거
            data?.takenBloodlusts?.forEach(spell => {
                newSelectedTakenSkill?.delete(spell.spellId);
            });
            // 블러드 대표(피의욕망) 지우기
            if (newSelectedTakenSkill?.has(2825)) {
                newSelectedTakenSkill?.delete(2825);
            }
        } else {
            // 하나라도 빠져 있으면, 모두 추가
            data?.takenBloodlusts?.forEach(spell => {
                newSelectedTakenSkill?.add(spell.spellId);
            });
            // 블러드 대표 추가
            if (!newSelectedTakenSkill?.has(2825)) {
                newSelectedTakenSkill?.add(2825);
            }
        }

        setSelectedTakenSkill(newSelectedTakenSkill);
    }, [selectedTakenSkill]); // data?.takenBloodlusts는 변경될 일 없는 객체라 넣지 않았다.

    // 데이터 불러오기
    useEffect(() => {

        if (!data) { return; }

        // 보스정보 0번 인덱스로 초기화
        setSelected(0);

        setSelectedSkill(initSelectedSkill)
        setSelectedBossSkill(initSelectedBossSkill)
        setTimelineHeight(initTimelineHeight)

    }, [data]);

    // 로딩?
    if (isLoading && data !== "UPDATING") {
        return <div></div>;
    }

    if (data === "UPDATING") {
        return <UpdatingApiStatus
            className={className}
            specName={specName}
            dungeonId={dungeonId}
        />;
    }

    if (!data) {
        return <div></div>;
    }

    // 주문번호 = 주문명 MAP 만들기
    const skillMap = {};
    [...data?.playerSkillInfo, ...data?.takenBuffInfo].forEach(skill => {
        skillMap[skill.spellId] = skill.spellName;
    });
    // MRT 모달용
    const modalPull = data?.rankings[isModalOpen]?.fights?.pulls[selected]
    const modalStartTime = modalPull?.startTime
    // 플레이어 캐스트 스킬, 받은 외생기 추출
    const modalPlayerCasts = modalPull?.events?.playerCasts?.reduce((acc, casts) => {
        const timeline = convertToTimeline(casts);
        return [...acc, ...timeline];
    }, []) || [];
    const modalPlayerTakenBuffs = modalPull?.events?.playerTakenDef?.reduce((acc, buffs) => {
        const timeline = convertToTimeline(buffs);
        return [...acc, ...timeline];
    }, []) || [];

    // 병합하고 타임스탬프로 정렬 + 스킬 정보 삽입
    const modalTimeline = [...modalPlayerCasts, ...modalPlayerTakenBuffs].map(skill => ({
        ...skill,
        skillName: skillMap[skill.abilityGameID] || ''
    })).filter(s => selectedSkill?.has(s.abilityGameID));
    modalTimeline?.sort((a, b) => a?.timestamp - b?.timestamp);

    // console.log(modalTimeline)

    // 0번(첫번째) 인덱스의 보스 데이터
    const firstBoss = (() => {
        for (let i = 0; i < data?.rankings?.length; i++) {
            const bossData = data?.rankings[i]?.fights?.pulls[selected];
            if (bossData != null) return bossData;
        }
    })();
    const combatTime = firstBoss?.combatTime // 전투시간
    firstBoss?.events?.enemyCasts?.sort((a, b) => a?.timestamp - b?.timestamp);
    const enemyCastsTimeline = convertToTimeline(firstBoss?.events?.enemyCasts); // beginCast와 cast를 duration으로 변환
    enemyCastsTimeline?.sort((a, b) => a?.timestamp - b?.timestamp); // 시간순 정렬
    const firstBossIDs = enemyCastsTimeline?.map(boss => boss?.abilityGameID); // 보스의 주문Id만 추출

    // console.log(isModalOpen)
    // console.log('선택한 스킬', selectedSkill)
    // console.log('보스 스킬 가공 전: ', firstBoss?.events?.enemyCasts)
    // console.log('보스 스킬 가공 후: ', enemyCastsTimeline)


    return (
        <div className='relative mx-2'>
            {/* 모달은 한 종류만 */}
            {isModalOpen !== -1 && (
                <MplusMRTModalComponent
                    setIsModalOpen={setIsModalOpen}
                    type={"Reminder"}
                    modalText={modalTimeline}
                    modalStartTime={modalStartTime}
                />
            )}
            {/* 보스 선택 */}
            <div className='flex my-2 overflow-x-scroll '>
                {bossList?.map((boss, i) => (
                    <div key={boss} className='relative min-w-[100px]'>
                        <img
                            src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/boss/face/${boss}.png`}
                            className={`w-[100px] h-[50px] cursor-pointer transition-all duration-200
                    ${selected === i ? 'shadow-md' : 'opacity-80'}
                    hover:opacity-100 hover:shadow-lg hover:scale-[1.02]`}
                            // alt={boss}
                            // title={boss}
                            onClick={() => handleSelectBoss(i)}
                        />
                        {selected === i && (
                            <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-700 border-t-4 border-white"></div>
                        )}
                    </div>
                ))}
            </div>
            {/* 스킬 표기 on/off */}
            <MplusSkillCheckComponent
                className={className}
                bossSkillInfo={data?.bossSkillInfo}
                playerSkillInfo={data?.playerSkillInfo}
                takenBuffInfo={data?.takenBuffInfo}
                takenBloodlusts={data?.takenBloodlusts}
                firstBossIDs={firstBossIDs}
                selectedBossSkill={selectedBossSkill}
                handleSelectSkill={handleSelectSkill}
                selectedSkill={selectedSkill}
                selectedTakenSkill={selectedTakenSkill}
                handleSelectBloodlust={handleSelectBloodlust}
            />
            <div className='flex relative'>
                <div style={{ marginTop: `${TL_Y_PER_LIST}px` }} >
                    {/* 보스 이름 */}
                    <div
                        className="block shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset]"
                        style={{ width: `${PL_WIDTH + 30}px`, height: `${TL_DURATION_RECT_HEIGHT}px` }}
                    >
                        <span className="text-[14px] flex justify-center items-center h-full text-ellipsis overflow-hidden whitespace-nowrap">
                            {firstBoss?.krBossName || "보스"}
                        </span>
                    </div>
                    {/* 좌측 플레이어 리스트 */}
                    {new Array(data?.rankings?.length || 0).fill().map((_, i) => (
                        <MplusPlayerComponent
                            key={'playerList' + i}
                            code={data?.rankings[i]?.report?.code}
                            fightID={data?.rankings[i]?.report?.fightID}
                            duration={convertToMMSS(data?.rankings[i]?.duration)} // 전투 지속시간
                            name={data?.rankings[i]?.name}
                            medal={data?.rankings[i]?.medal}
                            hardModeLevel={data?.rankings[i]?.hardModeLevel}
                            className={className}
                            specName={specName}
                            height={TL_DURATION_RECT_HEIGHT}
                            setIsModalOpen={setIsModalOpen}
                            index={i}
                            hasResourcesData={data?.rankings[i]?.fights?.pulls[selected]?.events?.hasOwnProperty("resources")}
                        />
                    ))}
                </div>
                <div className={`overflow-hidden flex-grow cursor-pointer ${timelineHeight > 25 && `h-${timelineHeight}`}`}>

                    {/* 타임라인 */}
                    <TimelineStageCanvas
                        handlePointerDown={handlePointerDown}
                        offsetX={offsetX}
                        setOffsetX={setOffsetX}
                        combatTime={combatTime}
                        enemyCastsTimeline={enemyCastsTimeline}
                        firstBoss={firstBoss}
                        rankingData={data?.rankings}
                        selected={selected}
                        selectedSkill={selectedSkill}
                        selectedBossSkill={selectedBossSkill}
                        selectedTakenSkill={selectedTakenSkill}
                        className={className}
                        skillList={
                            new Array(
                                ...(data?.playerSkillInfo),
                                ...(data?.takenBuffInfo)
                            )
                        }
                        timelineScaleX={timelineScaleX}
                        setTimelineScaleX={setTimelineScaleX}
                        timelineHeight={timelineHeight}
                        setTimelineHeight={setTimelineHeight}
                    />

                </div>
            </div>

        </div>
    );
}

export default MplusDefComponent;