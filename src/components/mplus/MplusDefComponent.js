import React, { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { convertToMMSS, convertToTimeline } from '../../global/function';
import { bannedBossSkills } from '../../global/variable/mplusVariable';
import { PL_WIDTH, TL_DURATION_RECT_HEIGHT, TL_Y_PER_LIST } from '../../global/variable/timelineConstants';
import { REFERENCE_WIDTH } from '../../global/variable/variable';
import BossCastCanvas from './canvas/BossCastCanvas';
import PlayerCastCanvas from './canvas/PlayerCastCanvas';
import TimelineBaseCanvas from './canvas/TimelineBaseCanvas';
import MplusMRTModalComponent from './common/MplusMRTModalComponent';
import MplusPlayerComponent from './MplusPlayerComponent';

const MplusDefComponent = ({ className, specName, dungeonId }) => {

    const stageRef = useRef();
    const layerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '', timestamp: '' });
    const [bossList, setBossList] = useState([]); // 보스 이름 배열
    const [selected, setSelected] = useState(0); // 선택한 pull 인덱스
    const [selectedSkill, setSelectedSkill] = useState(new Set()); // 타임라인에 표기할 플레이어가 사용한 스킬들
    const [selectedBossSkill, setSelectedBossSkill] = useState(new Set()); // 타임라인에 표기할 보스가 사용한 스킬들
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0); // 드래그 시작 X 좌표
    const [offsetX, setOffsetX] = useState(0); // 타임라인의 X 위치
    const [stageWidth, setStageWidth] = useState(window.innerWidth);
    const [stageHeight, setStageHeight] = useState(13 * TL_Y_PER_LIST + 9.5);
    const [isModalOpen, setIsModalOpen] = useState(-1);

    // 드래그 시작
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.evt.clientX); // 마우스 시작 좌표
    };

    useEffect(() => {
        // 드래그 이동
        const handleGlobalMouseMove = (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX; // e.evt 대신 e 사용 (window 이벤트이므로)
                const scaleFactor = window.innerWidth / REFERENCE_WIDTH; // 기준 너비를 잡고 현재 너비에 나눠서 비율만큼 속도 조정
                // console.log(scaleFactor)
                setOffsetX(prevOffsetX => Math.min(prevOffsetX + deltaX * scaleFactor * 0.7, 0)); // 0.7는 추가 속도 보정
                setStartX(e.clientX);
            }
        };

        // 전역 드래그 해제 이벤트
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        // 이벤트 리스너 추가
        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);

        // 클린업 함수 -> 컴포넌트 언마운트시 이벤트리스너를 제거하여 메모리 누수 방지
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, startX]); // isDragging 상태가 변경될 때만 실행

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
        setSelected(i)
    }
    // 스킬 표시 on/off
    const handleSelectSkill = (i, type) => {
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
    }

    // 파일 불러오기
    useEffect(() => {
        const loadData = async () => {
            // import할 폴더나 파일이 없으면 catch 에러 발생
            try {
                setIsLoading(true) // 로딩 시작

                const importMyData = async (dungeonId, c, s) => {
                    // console.log('데이터를 가져오기: ', dungeonId, c, s)
                    const myData = await import(`../../objects/${dungeonId}/${c}/${s}.json`)
                    // console.log('myData: ', myData)
                    return myData
                }

                const loadedData = await importMyData(dungeonId, className, specName);
                setData(loadedData);

                const bossNames = loadedData?.rankings[0]?.fights?.pulls?.map(pull => pull?.name) || [];
                setBossList(bossNames);

                const initSelectedSkills = new Set([ // 대괄호로 감싸고 두 map()을 스프레드연산자로 결합해야 두 배열을 한 Set에 넣기가능
                    ...(loadedData?.playerSkillInfo?.map(skill => skill.abilityGameID) || []), // 사용한 스킬
                    ...(loadedData?.takenBuffInfo?.map(skill => skill) || []) // 받은 외생기
                ]);
                setSelectedSkill(initSelectedSkills);

                const initBossSkills = new Set(
                    loadedData?.bossSkillInfo?.filter(s => !bannedBossSkills.includes(s))?.map(skill => skill)
                );
                setSelectedBossSkill(initBossSkills);

            } catch (e) {
                console.error('에러: ', e);
            } finally { // 성공 혹은 실패 이후
                setIsLoading(false) // 로딩 종료
            }
        }

        loadData()

    }, [className, dungeonId])

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

    if (isLoading) {
        return <div></div>;
    }

    // MRT 모달용
    const modalPull = data?.rankings[isModalOpen]?.fights?.pulls[selected]
    const modalStartTime = modalPull?.startTime
    const modalTimeline = modalPull?.events?.playerCasts?.reduce((acc, casts) => {
        const timeline = convertToTimeline(casts);
        return [...acc, ...timeline];
    }, []);
    modalTimeline?.sort((a, b) => a?.timestamp - b?.timestamp);

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
            {isModalOpen !== -1 && (
                <MplusMRTModalComponent
                    setIsModalOpen={setIsModalOpen}
                    type={"Reminder"}
                    modalText={modalTimeline}
                    modalStartTime={modalStartTime}
                />
            )}
            {/* 보스 선택 */}
            <div className='flex my-2'>
                {bossList?.map((boss, i) => (
                    <img
                        key={boss}
                        src={`${process.env.PUBLIC_URL}/images/mplus/boss/face/${boss}.png`}
                        className={`w-[100px] h-[50px] hover:bg-slate-300 cursor-pointer
                            ${selected === i ? 'bg-slate-300' : ''}`}
                        alt={boss}
                        title={boss}
                        onClick={() => handleSelectBoss(i)}
                    />
                ))}
            </div>
            <div className='mb-4 md:flex'>
                {/* 보스 스킬 표기 on/off */}
                <div className='flex items-center md:mr-3'>
                    <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                        <img className='w-[40px] h-[40px]'
                            src={`${process.env.PUBLIC_URL}/images/common/mark/tyrannical.jpg`}
                        />
                    </div>
                    {data?.bossSkillInfo
                        ?.filter(s => !bannedBossSkills.includes(s))
                        ?.filter(s => firstBossIDs?.includes(s))?.map((skill, i) => (
                            <a
                                href="#" data-wowhead={`spell=${skill}&domain=ko`}
                                key={'bossSkillInfo' + skill}
                                className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                ${selectedBossSkill.has(skill) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                                onClick={() => handleSelectSkill(skill, 'boss')}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/mplus/boss/spell/${skill}.jpg`}
                                />
                            </a>
                        ))}
                </div>
                {/* 플레이어 스킬 표기 on/off */}
                <div className='flex items-center md:mr-3'>
                    <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/player/spec/${className}.jpg`}
                        />
                    </div>
                    {data?.playerSkillInfo?.map((skill, i) => (
                        <a
                            href="#" data-wowhead={`spell=${skill?.abilityGameID}&domain=ko`}
                            key={skill.skillName}
                            className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                ${selectedSkill.has(skill.abilityGameID) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                            onClick={() => handleSelectSkill(skill.abilityGameID, 'player')}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/images/player/spell/${skill.abilityGameID}.jpg`}
                            />
                        </a>
                    ))}
                </div>
                {/* 외생기 스킬 표기 on/off */}
                <div className='flex items-center'>
                    <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/player/spell/10060.jpg`}
                        />
                    </div>
                    {data?.takenBuffInfo?.map((skill, i) => (
                        <a
                            href="#" data-wowhead={`spell=${skill}&domain=ko`}
                            key={skill + 'takenBuff'}
                            className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                ${selectedSkill.has(skill) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                            onClick={() => handleSelectSkill(skill, 'player')}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/images/player/spell/${skill}.jpg`}
                            />
                        </a>
                    ))}
                </div>
            </div>
            <div className='flex relative'>
                <div style={{ marginTop: `${TL_Y_PER_LIST}px` }} >
                    {/* 보스 이름 */}
                    <div
                        className="block shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset]"
                        style={{ width: `${PL_WIDTH + 30}px`, height: `${TL_DURATION_RECT_HEIGHT}px` }}
                    >
                        <div className="text-[14px] flex justify-center items-center h-full text-ellipsis overflow-hidden whitespace-nowrap">
                            {firstBoss.name}
                        </div>
                    </div>
                    {/* 좌측 플레이어 리스트 */}
                    {new Array(10).fill().map((_, i) => (
                        <MplusPlayerComponent
                            key={'playerList' + i}
                            code={data?.rankings[i]?.report?.code}
                            fightID={data?.rankings[i]?.report?.fightID}
                            duration={convertToMMSS(data?.rankings[i]?.duration)} // 전투 지속시간
                            name={data?.rankings[i]?.name}
                            medal={data?.rankings[i]?.medal}
                            hardModeLevel={data?.rankings[i]?.hardModeLevel}
                            myClass={className}
                            spec={data?.rankings[i]?.spec}
                            height={TL_DURATION_RECT_HEIGHT}
                            setIsModalOpen={setIsModalOpen}
                            index={i}
                        />
                    ))}
                </div>
                <div className='overflow-hidden flex-grow cursor-pointer'>
                    {/* 타임라인 */}
                    <Stage
                        ref={stageRef}
                        width={stageWidth}
                        height={stageHeight}
                        onMouseDown={handleMouseDown}
                    // onMouseMove={handleMouseMove}
                    // onMouseUp={handleMouseUp}
                    >
                        <Layer
                            ref={layerRef}
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
                                rankingData={data?.rankings}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                selected={selected}
                                selectedSkill={selectedSkill}
                                className={className}
                                skillList={data?.playerSkillInfo}
                            />
                        </Layer>
                    </Stage>
                </div>
                {/* 툴팁박스 */}
                {tooltip.visible && (
                    <div
                        className='absolute p-[6px] bg-black text-white rounded-md shadow-md pointer-events-none text-[12px]'
                        style={{
                            left: `${tooltip.x + PL_WIDTH + 30}px`,
                            top: tooltip.y - 60
                        }}
                    >
                        <div>
                            {tooltip.text}
                        </div>
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