import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useLogin } from "../../Services/Auth";
import { showToast } from "../Toast";
import { useNavigate } from "react-router-dom";
import { images } from "../../Assets";

export const GoogleLoginButton = ({ actor }) => {
    const login = useLogin();
    const navigate = useNavigate();

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const result = await login('/user/auth/google/callback', {
                token: credentialResponse.credential,
                source: actor === "provider" ? "service_provider" : actor
            });

            if (!result?.errors) {
                showToast("Login successful", "success");
                setTimeout(() => {
                    if (result?.data?.user?.type === "admin") {
                        navigate(`/admin/dashboard`);
                    } else if (result?.data?.user?.type === "service_provider") {
                        navigate(`/provider`);
                    } else {
                        navigate(`/`);
                    }
                }, 1000);
            } else {
                showToast(result?.errors, "error");
            }
        } catch (error) {
            showToast("Google login failed", "error");
        }
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                    showToast("Google login failed", "error");
                }}
                render={({ onClick }) => (
                    <button onClick={onClick} className="social-login-btn google">
                        <img src={images.googleIcon} alt="Google" className="google-icon" />
                    </button>
                )}
            />
        </GoogleOAuthProvider>
    );
};