import { Button } from "../ui";
import { FcGoogle } from "react-icons/fc"; // Google icon from Lucide (or React-Icons)
import authService from "../../services/authService";
const GoogleLoginButton = () => {

    const handleGoogleSignIn = async() => {
        // authService.googleLogin(); // Was not working well in secure browsers
        authService.googleTokenLogin();
    };

    return (
        <Button
            variant="secondary"
            className="w-full flex items-center gap-3 justify-center text-base  py-4.5"
            onClick={handleGoogleSignIn}
        >
            <FcGoogle className="shrink-0 size-6" />
            Sign In with Google
        </Button>
    );
}; 

export default GoogleLoginButton;
