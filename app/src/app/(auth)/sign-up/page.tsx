import { GLOBAL } from "@/lib/constants";
import SignUp from "../sign-up";

export default async function SignUpPage() {
    return <section className="section flex md:flex-row flex-col bg-black min-h-[60svh] md:items-center">
        <div className="flex flex-col justify-center flex-1">
            <div className="text-white max-w-[440px]">
            <h1 className="text-2xl md:text-6xl mb-3 font-bold">{GLOBAL.SIGN_UP_TEXT}</h1>
            <p>
                
            {GLOBAL.AUTH_SUBTEXT}
                <br/>
                <br/>
                
            </p>
       
            </div>
        </div>
     <div className="flex-1">
     <div className="-mb-[30%]">
        <SignUp />
        </div>
     </div>
    </section>;
}
