import { HTMLAttributes, useEffect, useState } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toast";
import { BACKEND_URL } from "@/lib/utils";

type ResetPasswordFormProps = HTMLAttributes<HTMLDivElement>;

async function resetPassword(password: string, resetToken: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token: resetToken }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
    }

    return data;
}

const formSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters long" }),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"], 
        });
    }
});

export function ResetPasswordForm({ className, ...props }: ResetPasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

    const router = useRouter();
    const searchParams = useSearchParams();
    const resetToken = searchParams.get('resetToken') || '';

    useEffect(() => {
        if (!resetToken) {
            setToastMessage("No reset token found in the URL.");
            setToastVariant("destructive");
            setToastOpen(true);
        }
    }, [resetToken]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            if (!resetToken) {
                throw new Error("Reset token is missing.");
            }
            const res = await resetPassword(data.password, resetToken);
            setToastMessage(res.message || "Password reset successfully!");
            setToastVariant("default");
            setToastOpen(true);
            form.reset();
        } catch (error: any) {
            setToastMessage(error.message || "Oops! Something went wrong");
            setToastVariant("destructive");
            setToastOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ToastProvider swipeDirection="right">
            <div className={cn("grid gap-6", className)} {...props}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="font-semibold">New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter New Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="font-semibold">Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm New Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mt-2" disabled={isLoading || !resetToken}>
                                {isLoading ? 'Submitting' : "Reset Password"}
                            </Button>
                        </div>
                    </form>
                </Form>

                <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
                    <ToastTitle>{toastVariant === "default" ? "Success" : "Error"}</ToastTitle>
                    <ToastDescription>{toastMessage}</ToastDescription>
                </Toast>
                <ToastViewport />
            </div>
        </ToastProvider>
    );
}
