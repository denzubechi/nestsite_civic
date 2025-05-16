"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../media/Frame 72.png";
import paymentImage from "../../media/Frame 108 (2).png";
import LayoutEffect from "../layoutEffect";
import Record from "../../media/Frame 103 (1) (1).png";
import Services from "./Services";
const stats = [
  {
    title: "Creators on the platform",
    value: "4,234+",
  },
  {
    title: "Paid out to Creators",
    value: "$20M+",
  },
  {
    title: "Uptime guarantee",
    value: "99.9%",
  },
  {
    title: "Flat platform fee",
    value: "3%",
  },
];

const Stats = () => {
  const features = [
    {
      name: "Trusted",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Over 1000+ creators",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 011 15.265V4.75zm16.5 7.385V11.01a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zm0 2.005a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .108.069.2.165.235h1.585a.25.25 0 00.25-.25v-1.11zm-15 1.11v-1.11a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.164.235H2.75a.25.25 0 01-.25-.25zm2-4.24v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V11.01a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25zm13-2.005V7.88a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zM4.25 7.63a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V7.88a.25.25 0 01.25-.25h1.5zm0-3.13a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5zm11.5 1.625a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5zm-9 3.125a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "2000+ ratings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const [isVideoPoppedUp, setVideoPopUp] = useState(false);

  return (
    <>
      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0 translate-y-6",
        }}
      >
        <section className="bg-white" style={{ background: "#f3f5ff" }}>
          <div className="gap-4 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-20">
            <div className="mt-0 md:mt-0">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-dark mt-4">
                Receive <span className="text-primary">Global Crypto</span>{" "}
                Payments, Instantly
              </h2>
              <p className="mb-6 font-light text-gray-800 md:text-lg">
                <p className="mb-4 text-gray-500">
                  Seamlessly receive cryptocurrency payments from clients
                  worldwide, breaking down financial borders and unlocking new
                  possibilities for your Web3-powered business. Our cutting-edge
                  blockchain technology ensures instant and transparent
                  transactions, putting you in control of your decentralized
                  financial success.
                </p>
                <p className="text-gray-500">
                  Join a decentralized network that empowers your business to
                  thrive internationally through cryptocurrency. With our
                  platform, your crypto payments know no boundaries, reflecting
                  the truly interconnected Web3 ecosystem. Embrace the future of
                  global digital asset transactions and pave the way for instant
                  financial growth in the crypto economy.
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
                src={paymentImage}
                alt="NestSite Logo"
                width={600}
              />
            </div>
          </div>
        </section>
      </LayoutEffect>

      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0 translate-y-6",
        }}
      >
        <section className="bg-[#f8f8fa]">
          <div className="flex flex-col-reverse md:flex-row items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-1 md:grid md:grid-cols-2 sm:py-16 lg:px-20">
            <div className="order-1 md:order-2 sm:order-1">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-dark">
                Elevate your <span className="text-primary">Web3 presence</span>{" "}
                effortlessly
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg">
                Discover the art of effortless elevation as NestSite propels
                your decentralized online presence to new heights in the Web3
                space. Craft compelling narratives, showcase your digital
                talents and creations (including NFTs and other Web3 assets),
                and captivate blockchain-savvy audiences with our user-friendly,
                Web3-integrated platform. Elevate your on-chain brand
                effortlessly, making an unforgettable impact in the vast
                decentralized digital landscape. Your journey to a distinguished
                Web3 presence begins here – with simplicity and sophistication
                at its core.
              </p>
              <a
                href="https://nestsite-app.vercel.app/login"
                className="inline-flex items-center text-white bg-black hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-10 py-3.5 text-center focus:ring-indigo-900 "
              >
                Create portfolio
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
            <div className="order-2 md:order-1 sm:order-2 mt-4 md:mt-0">
              <Image
                className="max-w-full h-auto lg:max-w-2xl"
                src={Logo}
                alt="NestSite Logo"
                width={600}
              />
            </div>
          </div>
        </section>
      </LayoutEffect>

      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0 translate-y-6",
        }}
      >
        <section className="bg-white">
          <div className="gap-4 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-20">
            <div className="mt-0 md:mt-0">
              <h2 className="mb-4 lg:text-4xl text-3xl tracking-tight font-extrabold text-darkmt-4">
                Track <span className="text-primary">sales and progress,</span>{" "}
                Seamlessly
              </h2>
              <p className="mb-6 font-light text-gray-800 md:text-lg">
                <p className="mb-4 text-gray-500">
                  Seamlessly receive payments from clients around the world,
                  breaking down borders and unlocking new possibilities for your
                  business. Our platform provides transparent and real-time
                  tracking of your crypto earnings from global clients,
                  empowering you with insights into your Web3 business
                  performance.
                </p>
                <p className="text-gray-500">
                  Gain a clear overview of your on-chain transactions and
                  growth. Our tools allow you to effortlessly track the flow of
                  your digital assets, ensuring you have the data needed to make
                  informed decisions and cultivate your success in the
                  borderless world of crypto commerce.
                </p>
              </p>
              <a
                href="https://nestsite-app.vercel.app/login"
                className="inline-flex items-center text-white bg-black hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-10 py-3.5 text-center focus:ring-indigo-900  font-bold"
              >
                Learn more
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
                src={Record}
                alt="NestSite Logo"
                width={600}
              />
            </div>
          </div>
        </section>
      </LayoutEffect>

      <Services />
      {/* <LayoutEffect
     className="duration-1000 delay-300"
     isInviewState={{
         trueState: "opacity-1",
         falseState: "opacity-0 translate-y-6"
     }}
>
<section>
    <div className="max-w-screen-xl mx-auto px-4 py-20 pt-15 gap-12 text-black md:px-8 xl:flex">
        <div className="space-y-5 max-w-2xl mx-auto text-center xl:text-left">
            <div className="flex flex-wrap items-center justify-center gap-6 text-primary  xl:justify-start">
                {
                    features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-x-2 text-black text-sm">
                            {item.icon}
                            {item.name}
                        </div>
                    ))
                }
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-extrabold mx-auto md:text-5xl">
            Discover Our Community Stories from Those Who Chose <span className='  bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 text-transparent bg-clip-text'>NestSite</span>
            </h1>
            <p className="max-w-xl mx-auto xl:mx-0">
           
            </p>
            
        </div>
        <div className="flex-1 max-w-7xl mx-auto mt-14 xl:mt-0"> 
            <div className="relative">
                <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="rounded-3xl w-full h-auto" alt="" /> 
                <button className="absolute w-16 h-16 rounded-full inset-0 m-auto duration-150  bg-gradient-to-r from-red-500 via-orange-500 to-purple-500  hover:bg-blue-600 ring-offset-2 focus:ring text-white"
                    onClick={() => setVideoPopUp(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 m-auto">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    {
        isVideoPoppedUp ? (
            <div className="fixed inset-0 w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 w-full h-full bg-black/50" onClick={() => setVideoPopUp(false)}></div>
                <div className="px-4 relative">
                    <button
                        className="w-12 h-12 mb-5 rounded-full duration-150 bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => setVideoPopUp(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-auto">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                    <video className="rounded-lg w-full max-w-2xl" controls autoPlay={true}>
                        <source src="https://res.cloudinary.com/floatui/video/upload/v1669411003/Binary_Search_Algorithm_in_100_Seconds_hyg6n5.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        ) : ""
    }
</section>

</LayoutEffect> */}
      {/**
 * 
<LayoutEffect
     className="duration-1000 delay-300"
     isInviewState={{
         trueState: "opacity-1",
         falseState: "opacity-0 translate-y-6"
     }}
>
<section className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-2 items-start justify-between lg:flex md:px-8">
             
               <div className="sm:hidden lg:block lg:max-w-xl ">
                    <img src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="rounded-lg" alt="" />

               </div>
                <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
                    <div className="max-w-2xl">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            We do our best to make <span className="text-primary">our customers</span> always happy
                        </h3>
                        <p className="mt-3 max-w-xl">
                        At NestSite, our mission is simple: your happiness. From creating beautiful websites to showcasing your work, we&apos;re dedicated to making your digital journey effortless and enjoyable. Join us, and let&apos;s build your dream space with smiles guaranteed.
                        </p>
                    </div>
                    <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                        <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-2">
                            {
                                stats.map((item, idx) => (
                                    <li key={idx} className="">
                                        <h4 className="text-4xl text-gray-800 font-semibold">{item.value}</h4>
                                        <p className="mt-3 font-medium">{item.title}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        </LayoutEffect>
 */}
    </>
  );
};

export default Stats;
