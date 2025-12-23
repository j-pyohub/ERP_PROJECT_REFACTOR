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
            <div className="bg-white rounded w-10/12 md:w-1/3 border border-gray-500 rounded-xl overflow-hidden shadowed" onClick={(e)=>e.stopPropagation()}>
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