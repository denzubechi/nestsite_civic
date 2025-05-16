"use client";

import Link from "next/link";
import LayoutEffect from "../layoutEffect";
import { UserCircleIcon,CurrencyDollarIcon,BuildingStorefrontIcon,CalendarDaysIcon,AcademicCapIcon ,LinkIcon} from "@heroicons/react/24/outline";
import { useId } from "react";



const Services = (): JSX.Element => {
    const services = [
        {
            id: useId(),
            icon: CurrencyDollarIcon,
            header: "Global Payments",
            cardBody: "Sell to audience and customers from different parts of the world and get paid for your works in multiple currencies. ",
            buttonText: "Get started",
        },
        {
            id: useId(),
            icon: UserCircleIcon,
            header: "Portfolio",
            cardBody: "Create a unique professional portfolio to showcase your voice,works and services with zerocoding experience.",
            buttonText: "Create Portfolio",
        },
        {
            id: useId(),
            icon: BuildingStorefrontIcon,
            header: "Storefront",
            cardBody: "Create a store that turns members of your audience into customers, sell your products and works to anyone, anywhere anytime.",
            buttonText: "Build Storefront",
        },
        {
            id: useId(),
            icon: CalendarDaysIcon,
            header: "Events",
            cardBody: "Setup your events and add paid or free tickets on your profile, help your customers reserve seats for your trainings with ease.",
            buttonText: "Join Waitlist",
            isScrollTrigger: true
        },
        {
            id: useId(),
            icon: AcademicCapIcon,
            header: "Masterclass",
            cardBody: "Make money teaching others what you know how to do best,host a workshop session,get members of your audience subscribed to that course.",
            buttonText: "Join Waitlist",
        },
        {   
            id: useId(),
            icon: LinkIcon,
            header: "Payment Links",
            cardBody: "Get paid easily by creating a payment link for a unique service.",
            buttonText: "Join Waitlist",
        },
    ];

    return (
        <>
        <LayoutEffect
     className="duration-1000 delay-300"
     isInviewState={{
         trueState: "opacity-1",
         falseState: "opacity-0 translate-y-6"
     }}
>

<section className="grid gap-16 py-12 bg-[#f8f8fa] px-3 lg:px-20">
            <div className="grid gap-4 lg:text-center">
                <h2 className="text-3xl sm:text-2xl font-bold leading-[120%]  lg:text-5xl lg:leading-[120%]">
                Create, share, and monetize your <span className="text-[#6E0BF0]">creative profile and business</span> with our robust tools. Track analytics in one place.
                </h2>

                <p className="text-gray-500">
                Nestite offers you a delightful stage to showcase your imagination and creations, connecting you with your cherished audience while also welcoming new admirers from every corner of the globe.
                </p>
            </div>

        
            <div className="grid gap-4 lg:grid-cols-3">
                {services.map((service): JSX.Element => (
                    <div className="cursor-pointer border border-gray-50 rounded-3xl bg-white p-8 grid gap-10 shadow-sm transition-colors duration-300 ease-in-out group/card hover:bg-[#6E0BF0] hover:text-gray-300" key={service.id}>
                        <div className="grid gap-4">
                            <service.icon className="w-12 bg-gray-100 p-2 rounded-full text-purple-400" href={'#'} />

                            <h3 className="text-brand-dark-purple font-semibold text-xl group-hover/card:text-white lg:text-2xl">
                                {service.header}
                            </h3>

                            <p className="leading-[140%] text-sm group-hover/card:text-[#f8f8fa] text-gray-500 hover:text-gray-300">
                                {service.cardBody}
                            </p>
                        </div>

                      {/**
                       *   <div className="inline-block w-auto">
                            {service.isScrollTrigger ? (
                                <button className="rounded-[2.75rem] border border-[rgba(42,_44,_96,_0.40)] inline-flex py-3 px-4 items-center gap-4 font-medium text-sm text-brand-dark-purple w-auto hover:bg-brand-dark-purple hover:text-white duration-300 ease-in-out transition-colors group group-hover/card:border-[#f8f8fa] group-hover/card:text-[#f8f8fa] hover:group-hover/card:bg-[linear-gradient(95deg,_#67B3E4_-5.03%,_#2A2C60_101.09%)] text-gray-500 hover:text-gray-30" type="button" onClick={() => {
                                    document.querySelector("#virtual-card")?.scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }}>
                                    {service.buttonText}

                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="group-hover:fill-white group-hover/card:fill-[#f8f8fa] transition-colors duration-300 ease-in-out" d="M8.00016 1.33333C4.32683 1.33333 1.3335 4.32667 1.3335 8C1.3335 11.6733 4.32683 14.6667 8.00016 14.6667C11.6735 14.6667 14.6668 11.6733 14.6668 8C14.6668 4.32667 11.6735 1.33333 8.00016 1.33333ZM9.86016 8.35333L7.50683 10.7067C7.40683 10.8067 7.28016 10.8533 7.1535 10.8533C7.02683 10.8533 6.90016 10.8067 6.80016 10.7067C6.60683 10.5133 6.60683 10.1933 6.80016 10L8.80016 8L6.80016 6C6.60683 5.80667 6.60683 5.48667 6.80016 5.29333C6.9935 5.1 7.3135 5.1 7.50683 5.29333L9.86016 7.64667C10.0602 7.84 10.0602 8.16 9.86016 8.35333Z" fill="#2a2c60" />
                                    </svg>
                                </button>
                            ) : (
                                <Link className="rounded-[2.75rem] border border-[rgba(42,_44,_96,_0.40)] inline-flex py-3 px-4 items-center gap-4 font-medium text-sm text-brand-dark-purple w-auto hover:bg-brand-dark-purple hover:text-white duration-300 ease-in-out transition-colors group group-hover/card:border-[#f8f8fa] group-hover/card:text-[#f8f8fa] hover:group-hover/card:bg-[linear-gradient(95deg,_#67B3E4_-5.03%,_#2A2C60_101.09%)]" href="#">
                                    {service.buttonText}

                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="group-hover:fill-white group-hover/card:fill-[#f8f8fa] transition-colors duration-300 ease-in-out" d="M8.00016 1.33333C4.32683 1.33333 1.3335 4.32667 1.3335 8C1.3335 11.6733 4.32683 14.6667 8.00016 14.6667C11.6735 14.6667 14.6668 11.6733 14.6668 8C14.6668 4.32667 11.6735 1.33333 8.00016 1.33333ZM9.86016 8.35333L7.50683 10.7067C7.40683 10.8067 7.28016 10.8533 7.1535 10.8533C7.02683 10.8533 6.90016 10.8067 6.80016 10.7067C6.60683 10.5133 6.60683 10.1933 6.80016 10L8.80016 8L6.80016 6C6.60683 5.80667 6.60683 5.48667 6.80016 5.29333C6.9935 5.1 7.3135 5.1 7.50683 5.29333L9.86016 7.64667C10.0602 7.84 10.0602 8.16 9.86016 8.35333Z" fill="#2a2c60" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                       */}
                    </div>
                ))}
            </div>
        </section>
</LayoutEffect>
        </>
        
    );
};

export default Services;
