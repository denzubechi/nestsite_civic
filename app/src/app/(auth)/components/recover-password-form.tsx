import { HTMLAttributes, useState } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toast";
import { BACKEND_URL } from "@/lib/utils";

type RecoverPasswordFormProps = HTMLAttributes<HTMLDivElement>;


async function recoverPassword(email: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to send recovery email');
    }

    return data;
}

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Invalid email address" }),
});

export function RecoverPasswordForm({ className, ...props }: RecoverPasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const res = await recoverPassword(data.email);
            setToastMessage(res.message || "Recovery email sent successfully!");
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="font-semibold">Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mt-2" disabled={isLoading}>
                                {isLoading ? 'Submitting' : "Send"}
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
