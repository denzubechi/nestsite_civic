import React from "react";
import LayoutEffect from "../layoutEffect";
import Image from "next/image";
import GlobeImage from "../../media/globe.png";
const Globe = () => {
  return (
    <div>
      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0 translate-y-6",
        }}
      >
        <section className="bg-[#f8f8fa] mx-5 lg:mx-20 rounded-3xl border border-gray-50">
          <div className="gap-4 items-center py-2 px-0 max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2  lg:px-20">
            <div className="mt-0 md:mt-0">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-[#6E0BF0] mt-4">
                Sell to anyone, anywhere and anytime.
              </h2>
              <p className="mb-6 font-light text-gray-800 md:text-lg">
                <p className="mb-4 text-gray-500">
                  Receive and monetize your digital content and skills on
                  Nestsite seamlessly, sell to a global audience, and get paid
                  for your work in various cryptocurrencies, including SOL,ETH,
                  USDC, and other popular tokens on the Solana & Etherium
                  blockchain.
                </p>
              </p>
              <a
                href="https://nestsite-app.vercel.app/login"
                className="inline-flex items-center text-white bg-black hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-10 py-3.5 text-center focus:ring-indigo-900 "
              >
                Get started
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex lg:justify-center">
              <Image
                className="max-w-full h-auto lg:max-w-2xl"
                src={GlobeImage}
                alt="NestSite Globe"
                width={700}
              />
            </div>
          </div>
        </section>
      </LayoutEffect>
    </div>
  );
};

export default Globe;
