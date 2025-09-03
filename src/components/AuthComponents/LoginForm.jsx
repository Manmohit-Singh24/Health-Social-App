import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { set } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Button,
} from "../ui/";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../../services/authService";
import dbService from "../../services/dbService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthData } from "../../store/Features/authSlice";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
    const isLogedIn = useSelector((state) => state.AuthData.isLogedIn);
    const email = useSelector((state) => state.AuthData.email) || "";
    useEffect(() => {
        if (isLogedIn) {
            navigate("/");
        }
    }, [isLogedIn]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email,
            password: "",
        },
    });
    const [showPassword, setShowPassword] = useState(false);
    const [backendError, setBackendError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (formData) => {
        setIsLoading(true);
        const resLogin = await authService.login(formData);

        if (resLogin.success) {
           const { email, name, $id: userId } = resLogin.data;

            dispatch(
                setAuthData({
                    email,
                    name,
                    userId,
                    isLogedIn: true,
                }),
            );
            const resUserData = await dbService.getProfileData({ userId });

            if (resUserData.success) {
                if (resUserData.data.total > 0) {
                    dispatch(
                        setAuthData({
                            username: resUserData.data.rows[0].username,
                        }),
                    );
                    navigate("/");
                } else {
                    toast.warning("Please Complete Your Profile");
                    navigate("/auth/edit-profile");
                }
            } else {
                setIsLoading(false);
                setBackendError(resUserData.message);
            }
        } else {
            setBackendError(resLogin.message);
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="LoginFormContainer"
                className="flex flex-col items-center w-full"
            >
                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="grid-rows-[1.2rem_2.2rem_1.2rem] mb-1 w-full items-start gap-1">
                            <FormLabel className="text-foreground">Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@example.com"
                                    className="text-foreground"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="grid-rows-[1.2rem_2.2rem_1.2rem] mb-1 w-full items-start gap-1">
                            <div className="flex justify-between">
                                <FormLabel className="text-foreground">Password</FormLabel>
                                <Link
                                    to="/auth/forgot-password"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative w-full">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    className="text-foreground"
                                    placeholder="......"
                                    {...field}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-4 w-4" />
                                    ) : (
                                        <FaEye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full mt-2">
                    {isLoading ? (
                        <>
                            <VscLoading className="animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>

                {backendError && (
                    <p className="text-center text-sm text-red-500 mt-4">{backendError}</p>
                )}

                {/* Sign up link */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </Form>
    );
};

export default LoginForm;
