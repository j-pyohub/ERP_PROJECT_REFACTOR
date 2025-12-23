export default function ModalBody({children}: {children: React.ReactNode}){
    return (
        <div className="text-gray-500 text-sm px-4 py-8">
            {children}
        </div>
    );
}