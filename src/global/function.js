import { TL_SPELL_WIDTH_PER_SEC } from "./variable/timelineConstants";

// 캐스트 타임테이블 duration으로 가공
export function convertToTimeline(casts, pullStartTime) {

    if (!casts) {
        return [];
    }

    // 콜백 함수의 3가지 인자 -> 현재 요소, 인덱스, 전체 원본 배열
    const filteredCasts = casts?.filter((cast, index, array) => {
        if (!cast?.type) return false;

        const timestamp = cast.timestamp;

        // 첫 번째 요소는 항상 포함
        if (index === 0) return true;

        const prevCast = array[index - 1];

        // 이전 기록과 10ms 이내라면 제외
        if (
            Math.abs(timestamp - prevCast.timestamp) <= 10
        ) {
            return false;
        }

        return true;
    });

    if (!Array.isArray(filteredCasts)) {
        return
    }
    // console.log(casts)
    const arr = [];
    const checkedSet = new Set();

    const size = filteredCasts.length

    for (let i = 0; i < size; i++) {
        if (!filteredCasts[i] || typeof filteredCasts[i] !== 'object') {
            continue;
        }
        const currentCast = filteredCasts[i];
        let type = filteredCasts[i]?.type;
        if (!currentCast.type) {
            continue;
        }

        // 전투 시작 전에 미리 쓴 버프일 경우 0번 인덱스가 removebuff로 시작한다.
        if (i === 0 && type === 'removebuff') {
            const cast = {
                timestamp: pullStartTime,
                abilityGameID: currentCast?.abilityGameID,
                duration: currentCast?.timestamp - pullStartTime, // 즉시 발동 스킬은 duration 0
                skillName: currentCast?.skillName
            };

            arr.push(cast);
        }

        // 타입: 시전 시작, 버프 시작
        if (type === 'begincast' || type === 'applybuff') {
            // 시전 시작 이후 목록 순회(캐스팅 중 다른스킬 시전한 경우가 있음)
            let matchingCastIndex = -1;
            for (let j = i + 1; j < size; j++) {
                if (
                    (filteredCasts[j]?.type === 'cast' || filteredCasts[j]?.type === 'removebuff') &&
                    filteredCasts[i]?.abilityGameID === filteredCasts[j]?.abilityGameID
                ) {
                    matchingCastIndex = j; // 시전시작, 버프시작 이후 만나는 첫 시전, 버프삭제 인덱스 기록
                    break;
                }
                // 시전 완료 없이 새 begincast(시전시작)/removebuff(버프종료)를 만나면 시전 실패
                if (
                    (filteredCasts[j]?.type === 'begincast' || filteredCasts[j]?.type === 'removebuff') &&
                    filteredCasts[i]?.abilityGameID === filteredCasts[j]?.abilityGameID
                ) {
                    break;
                }
            }

            if (matchingCastIndex !== -1) {
                const timestampStart = filteredCasts[i]?.timestamp;
                const timestampEnd = filteredCasts[matchingCastIndex]?.timestamp;
                const abilityGameID = filteredCasts[i]?.abilityGameID;

                // channeling 객체에 필요한 데이터 추가
                const cast = {
                    timestamp: timestampStart,
                    abilityGameID: abilityGameID,
                    duration: timestampEnd - timestampStart, // 지속 시간 계산
                    skillName: filteredCasts[i]?.skillName
                };

                // arr 배열에 channeling 객체 추가
                arr.push(cast);
                checkedSet.add(matchingCastIndex); // 캐스팅 완료의 cast와 즉시시전 cast를 구별하기 위함
            }

        } else if (type === 'cast') {
            if (!checkedSet.has(i)) { // 즉시시전 cast만 취급
                const cast = {
                    timestamp: currentCast?.timestamp,
                    abilityGameID: currentCast?.abilityGameID,
                    duration: 0, // 즉시 발동 스킬은 duration 0
                    skillName: currentCast?.skillName
                };

                arr.push(cast);
            }
        }

    }

    // console.log('arr', arr)
    if (arr.length === 0) { return casts }
    return arr;
}

// 밀리초 -> mm:ss 또는 mm:ss.SSS
export const convertToMMSS = (ms, type) => {
    if (type === 'ms') {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    } else {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
};

export const timestampToPosition = (timestamp, timelineScaleX) => {
    const result = timestamp / 1000 * timelineScaleX;
    return result > 0 ? result : 0;
};

export const convertToSrc = (abil, type) => {
    return type === 'mplus'
        ? `${process.env.REACT_APP_IMAGES_IP}/images/mplus/boss/spell/${abil}.jpg`
        : `${process.env.REACT_APP_IMAGES_IP}/images/ability/${abil}.jpg`;
}
