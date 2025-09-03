import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
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
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../../services/authService";
import { VscLoading } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "../../store/Features/authSlice";
import { toast } from "sonner";

const emailCheckeSchema = z.object({
    email: z.string().email("Invalid email"),
});

const registerSchema = emailCheckeSchema.extend({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    fullname: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [formPhase, setFormPhase] = useState(1);
    /*
    phase 1 :- Email field only. // keep reValidateMode = "onChange"
    phase 2 :- Email is avaliable and loaded all other fields // change reValidateMode = "onSubmit"
    pashe 3 :- Form is submitted after phase 2. // change reValidateMode = "onChange"
     */

    const form = useForm({
        resolver: zodResolver(formPhase === 1 ? emailCheckeSchema : registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            fullname: "",
        },
        reValidateMode: formPhase === 1 ? "onChange" : formPhase === 2 ? "onSubmit" : "onChange",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [backendError, setBackendError] = useState("");

    const onSubmit = async (formData) => {
        setIsLoading(true);

        if (formPhase === 1) {
            // check for availability.
            const resCheckEmail = await authService.checkEmailAvailablity(formData);

            if (resCheckEmail.success) {
                toast.message("Please Login", {
                    description: `User with email : ${formData.email} , already exists.`,
                });
                navigate("/auth/login");
                dispatch(setAuthData(formData));
            } else {
                // make the password , username , name field visible
                setFormPhase(2);
                setIsLoading(false);
            }
        } else {
            // register (phase 2)
            const resRegister = await authService.register(formData);

            if (resRegister.success) {
                const resLogin = await authService.login(formData);
                if (resLogin.success) {
                    const resVerifyEmail = await authService.sendVerificationLink();

                    if (resVerifyEmail.success) {
                        toast.message("Plase Verify your email", {
                            description: `Verification link sent to ${formData.email}.`,
                        });
                    }
                    dispatch(setAuthData({...formData , isLogedIn: true}));

                    navigate("/");
                } else {
                    setBackendError(resLogin.message);
                    setIsLoading(false);
                }
            } else {
                // handle error (phase 3)
                if (
                    resRegister.message ===
                    "A user with the same id, email, or phone already exists in this project."
                )
                    setBackendError("User with this email already exists.");
                else setBackendError(resRegister.message);

                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (formPhase === 2 && Object.keys(form.formState.errors).length > 0) {
            setFormPhase(3);
        }
    }, [form.formState.errors]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="RegisterFormContainer"
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
                                    type="text"
                                    className="text-foreground"
                                    placeholder="you@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username Field */}
                {formPhase !== 1 && (
                    <>
                        {/* Username Field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="grid-rows-[1.2rem_2.2rem_1.2rem] mb-1 w-full items-start gap-1">
                                    <FormLabel className="text-foreground">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="text-foreground"
                                            placeholder="you_123"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Full Name Field */}
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem className="grid-rows-[1.2rem_2.2rem_1.2rem] mb-1 w-full items-start gap-1">
                                    <FormLabel className="text-foreground">Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="text-foreground"
                                            placeholder="Your Name"
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
                                    <FormLabel className="text-foreground">New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="......"
                                                className="text-foreground"
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                <Button
                    type="submit"
                    variant={isLoading ? "disabled" : "default"}
                    className="w-full mt-2 bg-accent-foreground text-accent"
                >
                    {isLoading ? (
                        <>
                            <VscLoading className="animate-spin" />
                            Please wait
                        </>
                    ) : formPhase === 1 ? (
                        "Continue with Email"
                    ) : (
                        "Register"
                    )}
                </Button>

                {backendError && (
                    <p className="text-center text-sm text-red-500 mt-4">{backendError}</p>
                )}
                {/* Sign up link */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </Form>
    );
};

export default RegisterForm;
