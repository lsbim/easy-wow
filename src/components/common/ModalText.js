
const ModalText = ({ setIsModalOpen, modalText, type }) => {

    return (
        <div>
            <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
                onClick={() => setIsModalOpen(-1)}>
                <div className="bg-white p-4 shadow-xl rounded-md border-[1px] border-black w-[500px]"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between mb-4 items-center">
                        <h2 className="text-2xl font-bold pl-2">{type}</h2>
                        <button
                            className="hover:text-gray-400 font-bold w-6 h-6"
                            onClick={() => setIsModalOpen(-1)}
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
                    <textarea className="resize-none w-full h-[400px] p-1 outline-none border-[1px] border-black" defaultValue={modalText}>
                    </textarea>
                </div>
            </div>
        </div>
    );
}

export default ModalText;