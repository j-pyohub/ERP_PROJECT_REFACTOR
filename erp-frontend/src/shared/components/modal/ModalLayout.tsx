import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

interface ModalLayoutProps{
    title: string;
    footer: React.ReactNode;
    children: React.ReactNode;
    onClose: ()=>void;
}

export default function ModalLayout({title, footer, children, onClose} : ModalLayoutProps){
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center" onClick={onClose}>
            <div className="bg-white max-h-[80vh] rounded-xl overflow-hidden shadow-lg border border-gray-500" onClick={(e)=>e.stopPropagation()}>
                <ModalHeader label={title} className="bg-yellow-300"/>
                {/* 모달 내용 들어가는 곳 */}
                <ModalBody>
                    {children}
                </ModalBody>
                {/* 모달 버튼 들어가는 곳 */}
                <ModalFooter>
                    {footer}
                </ModalFooter>
            </div>
        </div>
    );
}