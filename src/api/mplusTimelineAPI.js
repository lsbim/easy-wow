import axios from "axios"

const path = process.env.REACT_APP_API_IP + "/mplus/timeline"

export const getMplusTimeline = async (params) => {

    // console.log(path)
    const { className, specName, dungeonId } = params;

    if (!className || !specName || !dungeonId) {
        console.error('params error.', params);
    }

    const res = await axios.get(path, {
        params: {
            className,
            specName,
            dungeonId
        }
    });

    if(!res.data){
        console.log(res)
    }

    return res.data;
}