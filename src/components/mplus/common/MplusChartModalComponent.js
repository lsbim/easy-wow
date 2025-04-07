import { useRef, useState } from "react";
import { convertToMMSS, translateType } from "../../../global/function";
import { testObj } from "../../../global/variable/wowVariable";
import ResourcesChartCanvas from "../canvas/ResourcesChartCanvas";
import useStagePointerDrag from "../../../hooks/useStagePointerDrag";

const MplusChartModalComponent = ({ setIsChartModalOpen, rankingData, className, specName, timelineScaleX, selected
    , skillList, handleMouseEnter, handleMouseLeave, selectedBossSkill
}) => {

    timelineScaleX = timelineScaleX + 5

    const [offsetX, setOffsetX, handlePointerDown] = useStagePointerDrag();

    const tableRef = useRef(null);

    const pull = rankingData[0]?.fights?.pulls[selected];
    const userName = rankingData[0]?.name;
    const startTime = pull.startTime;

    // Stage 정보 중 모달에서 써야할 부분만 부모에서 선언
    const stageWidth = 900;

    // console.log("startTime: ",startTime)
    const resourcesData = rankingData[0]?.fights?.pulls[selected]?.events?.resources;
    const damageTakenData = resourcesData?.damageTakenDataList;
    // console.log("resourcesData: ", resourcesData)

    if (resourcesData === null) {
        return (
            <div></div>
        )
    }


    return (
        <>
            <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/40"
            // onClick={() => setIsModalOpen(-1)}
            >
                <div className="bg-white shadow-lg shadow-black p-4 rounded-md border-2 border-slate-700 w-[1000px] mx-2"
                    onClick={(e) => e.stopPropagation()}>

                    <div className="flex justify-between mb-8 items-center">
                        <div className="flex items-center">
                            <img
                                src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${className}${specName}.jpg`}
                                className={`h-[28px] block 
                                    shadow-[1px_0_0_black,0_1px_0_black,1px_1px_0_black,1px_0_0_black_inset,0_1px_0_black_inset]`}
                            />
                            <h2 className="text-2xl font-bold pl-2">{userName ? userName : ''}</h2>
                        </div>
                        <button
                            className="hover:text-gray-400 font-bold w-6 h-6"
                            onClick={() => setIsChartModalOpen(-1)}
                        >
                            {/* X (닫기) 마크 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 15 13"
                                fill="currentColor"
                                stroke="none"
                                className="w-6 h-6 text-gray-800 hover:text-gray-500"
                            >
                                {/* 아래 d 속성값은 실제 path 데이터를 넣어주세요 */}
                                <path d="M12.6967 4.71424C12.957 4.45389 12.957 4.03178 12.6967 3.77143C12.4363 3.51108 12.0142 3.51108 11.7539 3.77143L8.22526 7.30003L4.69666 3.77143C4.43632 3.51108 4.01421 3.51108 3.75386 3.77143C3.49351 4.03178 3.49351 4.45389 3.75386 4.71424L7.28245 8.24284L3.75386 11.7714C3.49351 12.0318 3.49351 12.4539 3.75386 12.7142C4.01421 12.9746 4.43632 12.9746 4.69666 12.7142L8.22526 9.18565L11.7539 12.7142C12.0142 12.9746 12.4363 12.9746 12.6967 12.7142C12.957 12.4539 12.957 12.0318 12.6967 11.7714L9.16807 8.24284L12.6967 4.71424Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="cursor-pointer flex overflow-hidden mb-6">
                        <ResourcesChartCanvas
                            startTime={startTime}
                            endTime={rankingData[0]?.fights?.pulls[selected]?.endTime}
                            graphData={resourcesData?.graphData}
                            timelineScaleX={timelineScaleX}
                            rankingData={rankingData}
                            className={className}
                            selected={selected}
                            skillList={skillList}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            selectedBossSkill={selectedBossSkill}
                            offsetX={offsetX}
                            handlePointerDown={handlePointerDown}
                            stageWidth={stageWidth}
                        />
                    </div>
                    {/* 전투 데이터 테이블 */}
                    {damageTakenData && (
                        <div className="">
                            <div className="flex h-[20px] font-bold justify-center">
                                <div className="flex items-center justify-center w-[60px] pb-2 border-b-2 border-gray-600 mr-4">
                                    시간
                                </div>
                                <div className="flex items-center justify-center w-[60px] pb-2 border-b-2 border-gray-600 mr-4">
                                    분류
                                </div>
                                <div className="flex items-center justify-center w-[300px] pb-2 border-b-2 border-gray-600 mr-4">
                                    주문
                                </div>
                                <div className="flex items-center justify-center w-[80px] pb-2 border-b-2 border-gray-600 mr-4">
                                    수치
                                </div>
                                <div className="flex items-center justify-center w-[80px] pb-2 border-b-2 border-gray-600">
                                    흡수
                                </div>
                            </div>
                            {damageTakenData?.length > 0 && (
                                <div className="flex justify-center overflow-y-scroll h-[250px]" ref={tableRef}>
                                    <div className="flex-col">
                                        {damageTakenData?.map((d, i) => {
                                            const numbers = d?.buffs?.split('.')?.filter(Boolean)?.map(Number);
                                            return (
                                                <div
                                                    className={`flex h-[32px] text-[13px] ${i % 2 == 0 ? 'bg-white' : 'bg-gray-100'}`}
                                                    key={"damageTaken" + userName + d?.timestamp + i}>
                                                    <div className="flex justify-center w-[60px] py-2 mr-4 text-[12px]">
                                                        {convertToMMSS(d?.timestamp - startTime, "ms")}
                                                    </div>

                                                    {/* div 태그를 반환 */}
                                                    {translateType(d?.absorbed ? "absorbed" : d?.type)}

                                                    <div className="flex items-center justify-between w-[300px] py-2 px-4 mr-4">
                                                        <img
                                                            src={`${process.env.REACT_APP_IMAGES_IP}/images/ability/${d?.abilityGameID}.jpg`}
                                                            className="h-[24px]"
                                                        />
                                                        {numbers && (
                                                            <div className="flex">
                                                                {numbers.length > 0 && numbers.map(n => (
                                                                    <img
                                                                        key={"damageTakenBuffs" + d?.timestamp + n}
                                                                        src={`${process.env.REACT_APP_IMAGES_IP}/images/ability/${n}.jpg`}
                                                                        className="h-[18px]"
                                                                        title={n}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-center w-[80px] py-2 mr-4 text-red-700">
                                                        {"- " + d?.amount}
                                                    </div>
                                                    {d?.absorbed && (
                                                        <div className="flex justify-center w-[80px] py-2 text-sky-800">
                                                            {"+ " + d?.absorbed}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/* <div className="flex-col items-center justify-center w-[60px] py-2 mr-4">
                                        {damageTakenData?.map(d => (
                                            <div className="flex justify-center text-[12px] h-[25px]">
                                                {translateType(d?.absorbed ? "absorbed" : d?.type)}
                                            </div>
                                        ))}
                                    </div> */}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MplusChartModalComponent;