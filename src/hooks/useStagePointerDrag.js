import { useCallback, useEffect, useState } from "react";

const useStagePointerDrag = () => {

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0); // 드래그 시작 X 좌표
    const [offsetX, setOffsetX] = useState(0); // 타임라인의 X 위치

    const handlePointerDown = useCallback((e) => {
        setIsDragging(true);
        setStartX(e.evt ? e.evt.clientX : e.clientX);  // 마우스 시작 좌표
    }, []);

    const handlePointerMove = useCallback((e) => {
        if (!isDragging) return
        const deltaX = e.movementX; // e.movementX는 마지막 이벤트 이후 마우스 이동값(픽셀 단위)
        setOffsetX(prevOffsetX => Math.min(prevOffsetX + deltaX * 0.7, 0)); // 0.7는 추가 속도 보정
        setStartX(e.clientX);

    }, [isDragging, startX]);

    // 전역 드래그 해제 이벤트
    const handlePointerUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
        }
    }, [isDragging]);

    // 드래그 이동, 
    useEffect(() => {
        // 이벤트 리스너 추가
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        // 클린업 함수 -> 컴포넌트 언마운트시 이벤트리스너를 제거하여 메모리 누수 방지
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]); // isDragging 상태가 변경될 때만 실행

    return [offsetX, setOffsetX, handlePointerDown];
}

export default useStagePointerDrag;