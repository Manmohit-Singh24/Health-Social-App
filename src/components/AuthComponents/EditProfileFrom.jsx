import { useEffect, useState } from "react";
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
} from "../ui";

import dbService from "../../services/dbService";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
});
import { useSelector, useDispatch } from "react-redux";
import { setAuthData } from "../../store/Features/authSlice";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";

// Component is not fully completed
const EditProfileForm = () => {
    const user = useSelector((state) => state.AuthData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.isLogedIn) navigate("/");
    }, [user.isLogedIn]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user.username || "",
        },
    });

    const [backendError, setBackendError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [checkingUsername, setCheckingUsername] = useState(false);

    const onSubmit = async (formData) => {
        setIsLoading(true);
        const res = await dbService.addProfileData({
            userId: user.userId,
            username: formData.username,
        });

        if (res.success) {
            dispatch(
                setAuthData({
                    username: res.username,
                }),
            );
            toast.success("Profile Updated");
            navigate("/");
        } else {
            setBackendError(res.message);
            setIsLoading(false);
        }
    };

    // check for username availability
    const enteredUsername = form.watch("username");

    useEffect(() => {
        if (!enteredUsername) {
            setCheckingUsername(false);
            return;
        }
        setCheckingUsername(true);

        const callback = setTimeout(async () => {
            const res = await dbService.checkUsernameAvailability({ username: enteredUsername });

            if (res.success) {
                if (res.data.total > 0)
                    form.setError("username", { message: "Username already exists" });
                else form.clearErrors("username");

                setCheckingUsername(false);
            } else {
                setBackendError(res.message);
                setCheckingUsername(false);
            }
        }, 500); // wait for 0.5 seconds after typing

        return () => clearTimeout(callback);
        /*Every time username changes:
         * React runs cleanup from the previous effect → clearTimeout(delay) removes the last pending timer. ✅
         * A new 500ms timer is scheduled.
         */
    }, [enteredUsername]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="LoginFormContainer"
                className="flex flex-col items-center w-full"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="grid-rows-[1.2rem_2.2rem_1.2rem] mb-1 w-full items-start gap-1">
                            <FormLabel className="text-foreground">Username</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        type="text"
                                        className="text-foreground"
                                        placeholder="you_123"
                                        {...field}
                                    />

                                    {checkingUsername && (
                                        <VscLoading className="animate-spin size-2.5 absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0" />
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    variant={isLoading || checkingUsername ? "disabled" : "default"}
                    className="w-full mt-2 bg-accent-foreground text-accent"
                >
                    {isLoading ? (
                        <>
                            <VscLoading className="animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Update Profile"
                    )}
                </Button>

                {backendError && (
                    <p className="text-center text-sm text-red-500 mt-4">{backendError}</p>
                )}
            </form>
        </Form>
    );
};

export default EditProfileForm;
