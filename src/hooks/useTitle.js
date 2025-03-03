import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title + ' - 이지와우';

        return () => (document.title = prevTitle);
    },[title])
}
 
export default useTitle;