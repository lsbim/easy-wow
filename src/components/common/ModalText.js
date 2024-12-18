
const ModalText = ({ setIsModalOpen, modalText, type }) => {

    return (
        <div>
            <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
                onClick={() => setIsModalOpen(-1)}>
                <div className="bg-white p-4 shadow-xl rounded-md border-2 border-black w-[500px]"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="">
                        <h2 className="text-2xl font-bold pl-2 pb-4">{type}</h2>
                    </div>
                    <textarea className="resize-none w-full h-[400px] p-1" defaultValue={modalText}>
                    </textarea>
                    <div className="flex justify-end">
                        <button
                            className="close-button mt-4 hover:bg-gray-300 font-bold py-2 px-4 rounded"
                            onClick={() => setIsModalOpen(-1)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalText;