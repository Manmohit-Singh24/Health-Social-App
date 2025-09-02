import MyIcon from "../assets/MyIcon/MyIcon";
import { Button } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ErrorPage = () => {
    const navigate = useNavigate();
    const theme = useSelector((state) => state.UIData.Theme);
    
    return (
        <div
            className={`${theme} flex flex-col items-center justify-center h-screen bg-background`}
        >
            <div className="flex flex-col items-center  text-center gap-5">
                <MyIcon name="AlertTriangle" className="size-20 stroke-foreground" />

                <h1 className="text-6xl font-bold text-foreground">401</h1>
                <p className="text-muted-foreground">
                    Oops, you don't have permission to access this page. <br />
                    Please check your credentials and try again.
                </p>
                <Button onClick={() => navigate("/")}>Go To HomePage</Button>
            </div>
        </div>
    );
};

export default ErrorPage;
