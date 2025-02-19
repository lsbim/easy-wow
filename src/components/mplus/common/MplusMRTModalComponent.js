import { convertToMMSS } from "../../../global/function";
import ModalText from "../../common/ModalText";

const MplusMRTModalComponent = ({ setIsModalOpen, modalText, type, modalStartTime }) => {

    // console.log(modalText)

    const modalTextStr = modalText?.map(item => {
        const timestamp = convertToMMSS(item.timestamp - modalStartTime);

        return `{time:${timestamp}} {spell:${item.abilityGameID}} ${item.skillName}`
    })?.join("\n"); // 줄바꿈

    return (
        <div>
            <ModalText
                setIsModalOpen={setIsModalOpen}
                modalText={modalTextStr}
                type={type}
            />
        </div>
    );
}

export default MplusMRTModalComponent;