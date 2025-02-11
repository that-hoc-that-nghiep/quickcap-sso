import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { instance } from "../../utils";
import GoogleIcon from "../../components/icons/GoogleIcon";
import LoadingIcon from "../../components/icons/LoadingIcon";

const GoogleLoginButton = ({
  onClick,
  loading = false,
}: {
  onClick: () => void;
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <button
        className="flex items-center justify-center gap-4 w-full py-2 px-4 rounded-md bg-red-400 border border-black/10 shadow-sm cursor-not-allowed"
        disabled
      >
        <LoadingIcon />
        <span className="font-medium text-white">Continue with Google</span>
      </button>
    );
  }
  return (
    <button
      className="flex items-center justify-center gap-4 w-full py-2 px-4 rounded-md bg-red-500 border border-black/10 shadow-sm"
      onClick={onClick}
    >
      <GoogleIcon className="h-4 w-4 text-white" />
      <span className="font-medium text-white">Continue with Google</span>
    </button>
  );
};

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const redirectUri = searchParams.get("redirect_uri") || window.location.origin;

      console.log(redirectUri);
      const { data } = await instance.post("/auth/login", {
        provider: "google",
        redirectAfterLogin: redirectUri,
      });
      console.log(data.data);

      if (data.code === 302) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b">
      <div className="w-full max-w-md shadow-lg p-6 bg-white rounded-md">
        <h2 className="text-2xl font-bold text-center pb-4">
          Chào mừng đến với QuickCap
        </h2>
        <p className="text-center mb-4 pb-2">
          Đăng nhập vào tài khoản Google của bạn
        </p>
        <GoogleLoginButton onClick={handleGoogleLogin} loading={loading} />
        <p className="text-center text-sm text-gray-600 mt-4">
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          và{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Chính sách riêng tư
          </a>{" "}
          của chúng tôi
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
