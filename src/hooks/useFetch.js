import { useEffect, useState } from "react";
import { getMplusTimeline } from "../api/mplusTimelineAPI";
import { bannedBossSkills } from "../global/variable/mplusVariable";
import { convertToSrc } from "../global/function";

export const useFetch = ({ dungeonId, className, specName }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bossList, setBossList] = useState([]);
    const [initTimelineHeight, setInitTimelineHeight] = useState(26);
    const [initSelectedSkill, setInitSelectedSkill] = useState(new Set()); // 타임라인에 표기할 플레이어가 사용한 스킬들
    const [initSelectedBossSkill, setInitSelectedBossSkill] = useState(new Set()); // 타임라인에 표기할 보스가 사용한 스킬들

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
                // console.log("My DATA: ", loadedData);
                if (response?.data?.rankings?.length === 0) {
                    console.log("랭킹 데이터가 없습니다!");
                    setData(null);
                    return;
                }
                // 랭킹데이터 배열 크기만큼 타임라인 사이즈 설정
                setInitTimelineHeight(27 + (loadedData?.rankings?.length + 1) * 28)

                // 보스 이름 목록
                const bossNames = loadedData?.rankings[0]?.fights?.pulls?.map(pull => pull?.name) || [];
                setBossList(bossNames);

                // on/off 직업스킬/받은외생기
                const initSelectedSkills = new Set([ // 대괄호로 감싸고 두 map()을 스프레드연산자로 결합해야 두 배열을 한 Set에 넣기가능
                    ...(loadedData?.playerSkillInfo?.map(skill => skill?.spellId) || []), // 사용한 스킬
                    // ...(loadedData?.takenBuffInfo?.map(skill => skill?.spellId) || []) // 받은 외생기
                ]);
                setInitSelectedSkill(initSelectedSkills);

                // on/off 보스스킬.
                const initBossSkills = new Set(
                    loadedData?.bossSkillInfo?.filter(s => !bannedBossSkills.includes(s))?.map(skill => skill)
                );
                setInitSelectedBossSkill(initBossSkills);

                // 이미지 프리로드 -> 네트워크 요청 감소
                const preloadImage = (abil, type) => {
                    const img = new Image();
                    img.src = type ? convertToSrc(abil, type) : abil;
                }
                initSelectedSkills?.forEach(a => preloadImage(a, className));
                initBossSkills?.forEach(a => preloadImage(a, 'mplus'));
                bossNames?.forEach(b => preloadImage(`${process.env.REACT_APP_IMAGES_IP}/images/mplus/boss/face/${b}.png`));


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
    }, [dungeonId, className, specName]);

    return [ data, isLoading, bossList, initSelectedSkill, initSelectedBossSkill, initTimelineHeight ];
}
