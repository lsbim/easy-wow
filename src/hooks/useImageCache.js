import { useEffect, useState } from "react";

const imageCache = new Map();

// 이미지캐싱 -> React 렌더링 중 성능 최적화. 프리로드와 상호보완
export const useImageCache = (src) => {
    
    const [image, setImage] = useState(null);

    useEffect(() => {
        if(imageCache.has(src)){ // Map에 호출한 url이 이미 등록돼있다면
            setImage(imageCache.get(src)); // 리턴할 상태 갱신
            return; // useEffect 종료
        }

        // 이미지 로드
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imageCache.set(src, img); // 키: url / 값: 이미지객체로 캐싱
            setImage(img); // 상태 갱신
        }

        img.onerror = () => {
            imageCache.set(src, "broken");
            setImage("broken");
        }

    },[src])

    return [image]; // 상태에 담긴 이미지 객체 리턴
}