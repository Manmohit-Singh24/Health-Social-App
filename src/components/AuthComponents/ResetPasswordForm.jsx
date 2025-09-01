import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { FaEye, FaEyeSlash } from "react-icons/fa";

const formSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // 👈 error will be shown under confirmPassword
    });

const ResetPasswordForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="LoginFormContainer"
                className="flex flex-col items-center w-full"
            >
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

                {/*Confirm Password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="grid-rows-[1.2rem_2.2rem_1.2rem] mb-1 w-full items-start gap-1">
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="......"
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                                    >
                                        {showConfirmPassword ? (
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

                <Button type="submit" className="w-full mt-2">
                    Reset Password
                </Button>
            </form>
        </Form>
    );
};

export default ResetPasswordForm;
