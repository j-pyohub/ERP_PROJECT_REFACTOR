import { useLoginForm } from "../hooks/useLoginForm";
import { LabeledInput } from "../../../shared/components/LabeledInput";

function LoginPage() {
    const { managerId, setManagerId, pw, setPw, error, handleSubmit } = useLoginForm(); 
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FFEEAA]">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">회사 로고</h2>
                    <h1 className="text-xl font-semibold mt-2">로그인</h1>
                </div>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <LabeledInput
                        label="아이디"
                        id="managerId"
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={managerId}
                        onChange={(e) => setManagerId(e.target.value)}
                    />

                    <LabeledInput
                        label="비밀번호"
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="yellow-btn"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;