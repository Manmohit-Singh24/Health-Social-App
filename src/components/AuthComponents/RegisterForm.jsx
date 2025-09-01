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

const emailCheckeSchema = z.object({
    email: z.string().email("Invalid email"),
});

const registerSchema = emailCheckeSchema.extend({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    fullname: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const RegisterForm = () => {
    const navigate = useNavigate();
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

    const onSubmit = (data) => {
        console.log(data);
        console.log(form.formState.isSubmitted);

        if (formPhase === 1) {
            // check for availability.
            const checkedEmailAvailablitiy = true; // API call

            if (!checkedEmailAvailablitiy) navigate("/auth/login");
            else {
                setFormPhase(2);
                // make the password , username , name field visible
            }
        } else {
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="you@example.com" {...field} />
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
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="you_123" {...field} />
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
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Your Name" {...field} />
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
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Input
                                                type={showPassword ? "text" : "password"}
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                <Button type="submit" className="w-full mt-2">
                    Login
                </Button>

                {/* Sign up link */}
                <p className="text-center text-sm text-gray-500 mt-4">
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
