export default function ModalFooter({children}: {children:React.ReactNode}){
    return(
        <div className="flex justify-center items-center w-100 border-t p-3 text-gray-500">
            {children}
        </div>
    );
}