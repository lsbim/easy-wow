import React, { useCallback, useEffect, useState } from 'react';
import { getMplusTimeline } from '../../api/mplusTimelineAPI';
import { convertToMMSS, convertToSrc, convertToTimeline } from '../../global/function';
import { bannedBossSkills } from '../../global/variable/mplusVariable';
import { PL_WIDTH, TL_DURATION_RECT_HEIGHT, TL_Y_PER_LIST } from '../../global/variable/timelineConstants';
import useStagePointerDrag from '../../hooks/useStagePointerDrag';
import UpdatingApiStatus from '../common/UpdatingApiStatus';
import TimelineStageCanvas from './canvas/TimelineStageCanvas';
import MplusMRTModalComponent from './common/MplusMRTModalComponent';
import MplusPlayerComponent from './MplusPlayerComponent';
import MplusSkillCheckComponent from './MplusSkillCheckComponent';

const MplusDefComponent = ({ className, specName, dungeonId }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '', timestamp: '' });
    const [bossList, setBossList] = useState([]); // 보스 이름 배열
    const [selected, setSelected] = useState(0); // 선택한 pull 인덱스
    const [selectedSkill, setSelectedSkill] = useState(new Set()); // 타임라인에 표기할 플레이어가 사용한 스킬들
    const [selectedBossSkill, setSelectedBossSkill] = useState(new Set()); // 타임라인에 표기할 보스가 사용한 스킬들
    const [offsetX, setOffsetX, handlePointerDown] = useStagePointerDrag();
    const [isModalOpen, setIsModalOpen] = useState(-1);
    const [timelineScaleX, setTimelineScaleX] = useState(6); // 타임라인 시간(초)과 간격(픽셀)의 비율
    const [timelineHeight, setTimelineHeight] = useState(26);

    // 툴팁
    const handleMouseEnter = (e, abilityGameID, timestamp) => {
        const { x, y } = e.target.getClientRect(); // 이미지의 위치 계산
        setTooltip({ visible: true, x: x, y: y, text: `${abilityGameID}`, timestamp: `${timestamp}` });
    };
    // 툴팁
    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, text: '' });
    };

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
        }
    },[selectedSkill])

    const handleSelectBloodlust = useCallback(() => {
        const isSelectBlood = data?.takenBloodlusts?.every( // 전부 포함됐는지?
            spell => selectedSkill?.has(spell.spellId)
        );

        const newSelectedSkill = new Set(selectedSkill);

        if (isSelectBlood) {
            // 모두 포함되어 있으면, 해당 spellId들만 제거
            data?.takenBloodlusts?.forEach(spell => {
                newSelectedSkill?.delete(spell.spellId);
            });
        } else {
            // 하나라도 빠져 있으면, 모두 추가
            data?.takenBloodlusts?.forEach(spell => {
                newSelectedSkill?.add(spell.spellId);
            });
        }

        setSelectedSkill(newSelectedSkill);
    }, [selectedSkill]); // data?.takenBloodlusts는 변경될 일 없는 객체라 넣지 않았다.

    // 데이터 불러오기
    useEffect(() => {
        const controller = new AbortController();
        const loadData = async () => {
            try {
                if (!isLoading && data !== 'UPDATING') { // 업데이팅 상태에 쓸데없는 리렌더링 방지
                    setIsLoading(true) // 로딩 시작
                }

                // API 호출
                const response = await getMplusTimeline({ dungeonId, className, specName, signal: controller.signal });
                // console.log('API Response', response)
                if (response?.status === "UPDATING" && response?.data === null) {
                    if (data !== "UPDATING") { // 업데이팅 상태에 쓸데없는 리렌더링 방지
                        setData("UPDATING");
                        console.log("업데이트 중...")
                    }
                    // 취소 가능한 타임아웃
                    if (!controller.signal.aborted) {
                        setTimeout(() => {
                            if (!controller.signal.aborted) {
                                loadData();
                            }
                        }, 3000);
                    }
                    return;
                }

                const loadedData = response?.data;
                setData(loadedData);
                console.log("My DATA: ", loadedData);
                if (response?.data?.rankings?.length === 0) {
                    console.log("랭킹 데이터가 없습니다!");
                    setData(null);
                    return;
                }
                // 랭킹데이터 배열 크기만큼 타임라인 사이즈 설정
                setTimelineHeight(27 + (loadedData?.rankings?.length + 1) * 28)

                // 보스 이름 목록
                const bossNames = loadedData?.rankings[0]?.fights?.pulls?.map(pull => pull?.name) || [];
                setBossList(bossNames);

                // on/off 직업스킬/받은외생기
                const initSelectedSkills = new Set([ // 대괄호로 감싸고 두 map()을 스프레드연산자로 결합해야 두 배열을 한 Set에 넣기가능
                    ...(loadedData?.playerSkillInfo?.map(skill => skill?.spellId) || []), // 사용한 스킬
                    // ...(loadedData?.takenBuffInfo?.map(skill => skill?.spellId) || []) // 받은 외생기
                ]);
                setSelectedSkill(initSelectedSkills);
 

                // on/off 보스스킬. 위와 합쳐도 되지 않나?
                const initBossSkills = new Set(
                    loadedData?.bossSkillInfo?.filter(s => !bannedBossSkills.includes(s))?.map(skill => skill)
                );
                setSelectedBossSkill(initBossSkills);

                // 이미지 프리로드 -> 네트워크 요청 감소
                const preloadImage = (abil, type) => {
                    const img = new Image();
                    img.src = type ? convertToSrc(abil, type) : abil;
                }
                initSelectedSkills?.forEach(a => preloadImage(a, className));
                initBossSkills?.forEach(a => preloadImage(a, 'mplus'));
                bossNames?.forEach(b => preloadImage(`${process.env.REACT_APP_IMAGES_IP}/images/mplus/boss/face/${b}.png`));

                // 보스정보 0번 인덱스로 초기화
                setSelected(0);

                if (response?.status !== 'UPDATING') {
                    setIsLoading(false); // 업데이트중이 아닐 때에 로딩 종료
                }
            } catch (e) {
                // console.error('에러: ', e);
                if (e.name === 'AbortError') {
                    console.log('Fetch aborted');
                }
            }
        }

        loadData();

        // 컴포넌트 언마운트 시 or 의존성 변경 시 모든 진행 중인 요청 취소
        return () => {
            controller.abort();
        };
    }, [className, dungeonId, specName]);

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
    }));
    modalTimeline?.sort((a, b) => a?.timestamp - b?.timestamp);

    // console.log(modalTimeline)

    // 0번(첫번째) 인덱스의 보스 데이터
    const firstBoss = data?.rankings[0]?.fights?.pulls[selected]
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
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        firstBoss={firstBoss}
                        selectedBossSkill={selectedBossSkill}
                        rankingData={data?.rankings}
                        selected={selected}
                        selectedSkill={selectedSkill}
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
                {/* 툴팁박스... 모달이 띄워져 있는 동안 출력되지 않도록 */}
                {tooltip.visible && (isModalOpen === -1) && (
                    <div
                        className='absolute p-[6px] bg-black text-white rounded-md shadow-md pointer-events-none text-[12px]'
                        style={{
                            left: `${tooltip.x + PL_WIDTH + 30}px`,
                            top: tooltip.y - 10,
                            transform: 'translateY(-100%)'
                        }}
                    >
                        {tooltip?.text && tooltip?.text !== "null" && (
                            <div>
                                {tooltip.text}
                            </div>
                        )}
                        <div>
                            {tooltip.timestamp}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default MplusDefComponent;