"use client";
import { Card } from "@/components/ui/card";
import { UserAuthForm } from "./components/user-auth-form";
import Link from "next/link";
export default function SignIn() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 md:max-w-[470px] lg:p-8">
        <Card className="p-6 border-none rounded-xl">
          {/* <div className="flex font-semibold flex-col text-left mb-6">
							<h1 className="text-md tracking-tight mb-3 text-gray-700">
								Do not have an account? &nbsp;
								<Link href="/sign-up" className="text-md font-medium text-primary">
                                    Sign up
                                </Link>
							</h1>
							<h2 className="text-3xl -mt-4 text-gray-700">Welcome back👋</h2>
							
						</div> */}
          <UserAuthForm />
        </Card>
      </div>
    </>
  );
}
