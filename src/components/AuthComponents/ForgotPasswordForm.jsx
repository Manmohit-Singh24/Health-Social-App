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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const ForgotPasswordForm = () => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        navigate("/auth/check-email");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="LoginFormContainer"
                className="flex flex-col items-center w-full pt-7"
            >
                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="grid-rows-[1.2rem_2.2rem_1.2rem] mb-1 w-full items-start gap-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mt-2">
                    Reset Password
                </Button>
                <Link to="/auth/login" className=" mt-4 text-blue-600 hover:underline">
                    Cancel
                </Link>{" "}
            </form>
        </Form>
    );
};

export default ForgotPasswordForm;
