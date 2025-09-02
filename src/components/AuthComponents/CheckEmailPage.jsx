import { Link } from "react-router-dom";
import MyIcon from "../../assets/MyIcon/MyIcon";
import { useSelector } from "react-redux";
import { Button } from "../ui/";

const CheckEmailPage = () => {
    const email = useSelector((state) => state.AuthData.email) || "--you@gmail.com--";

    return (
        <div className="flex flex-col items-center mt-5 gap-5">
            <MyIcon name="CheckEmail" className="size-60" />
            <p className="text-center text-nowrap">
                If account exists for <b>{email}</b> ,<br />
                you will recieve an email with instructions on <br />
                resetting your password. <br />
                If it doesn’t arrived within a few minutes,
                <br />
                make sure to check your spam folder.<br />
                Link will expire in 60 minutes.<br />
            </p>
            <Button
                variant={"outline"}
                className={"w-full flex items-center gap-3 justify-center text-base py-4.5"}
                onClick={() => {
                    window.open("https://mail.google.com", "_new");
                }}
            >
                <MyIcon name="Gmail" className="size-6" />
                Open Gmail
            </Button>
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-800">
                Back to Login
            </Link>
        </div>
    );
};

export default CheckEmailPage;
