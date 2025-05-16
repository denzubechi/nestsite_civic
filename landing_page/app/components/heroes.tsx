"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Background from "../heroes.avif";

export default function Heroes() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        className=" text-white "
        style={{
          background: `url(${Background.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/**   backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply')", */}
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="mt-4 relative isolate px-6 pt-0 lg:px-10">
          <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-41">
            <div className="lg:flex sm:mb-8 flex justify-center">
              <a
                href="#"
                className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-white bg-gray-800 rounded-full  dark:text-white hover:bg-gray-200"
                role="alert"
                style={{
                  background: "inherit",
                  border: "1px solid",
                  borderColor: "gray",
                }}
              >
                <span
                  className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3"
                  style={{ background: "#E5DCF3", color: "black" }}
                >
                  New
                </span>{" "}
                <span className="text-sm font-medium">
                  NestSite is out! See what&apos;s new
                </span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="text-center">
              <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-[900] tracking-tight text-white animate__animated animate__bounce heading">
                Create,
                <br /> Share and Build <br /> Your Stellar World.
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-400 ">
                No code needed.<br></br> It only takes a few minutes.✨
              </p>
              <div className="mt-6 inline-flex items-center w-full justify-center gap-x-6">
                {/* Wrap Get started in lg:flex */}
                <Link
                  href="https://nestsite-app.vercel.app/login"
                  className="rounded-full text-white  px-4 py-3.5 w-full text-md font-semibold shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 w-60 bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 Link"
                >
                  Get started for free
                </Link>
              </div>
              <div className="flex justify-center items-center pt-6 gap-x-4 text-gray-400 text-md">
                <div className="flex">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                  </svg>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                  </svg>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                  </svg>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                  </svg>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                  </svg>
                </div>
                <p>
                  <span className="text-gray-100">5.0</span> by over 1000
                  creators
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-20rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
