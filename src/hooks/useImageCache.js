import { useEffect, useState } from "react";

const imageCache = new Map()

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

    },[src])

    return [image]; // 상태에 담긴 이미지 객체 리턴
}