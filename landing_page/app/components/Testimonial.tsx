"use client"
"use client"
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FaStar } from 'react-icons/fa';
import LayoutEffect from '../layoutEffect';
const testimonies = [
  {
    id: 1,
    heading:"A Game charger for my portfolio !",
    text: ' Never built a website before. I did with Nestsite in minutes, and on my phone!!!',
    author: 'Levithegrapher',
    position: 'Street Photographer',
    image: 'https://res.cloudinary.com/dqny2b4gb/image/upload/v1706627278/A77983E1-944D-4EE4-BD4F-EE0E9D120A88_b8lscy.jpg',
  },
  {
    id: 2,
    heading:"NestSite is just so awesome!",
    text: 'I used Nestsite to design my dream portfolio site, and its been a seamless experience thus far. Nestsite is an answered prayer',
    author: 'Samuel Nzubechi',
    position: 'Product Developer',
    image: 'https://avatars.githubusercontent.com/u/98186867?v=4',
  },
  // Add more testimonies to the array
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimony = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonies.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimony = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonies.length - 1 : prevIndex - 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextTestimony,
    onSwipedRight: prevTestimony,
  });

  const currentTestimony = testimonies[currentIndex];

  return (
    <LayoutEffect
    className="duration-1000 delay-300"
    isInviewState={{
        trueState: "opacity-1",
        falseState: "opacity-0 translate-y-6"
    }}
>
    <section className=" mx-1 mb-4 ">
      <div className="container px-6 py-16 mx-auto"
      >
      <div className=" mb-2 md:flex md:items-center md:justify-between">
            <div>
                <div className=' bg-primary p-2 rounded-full text-center text-white' style={{width:100}}>reviews &nbsp;
                </div>
                <h1 className="text-2xl font-semibold text-gray-800  lg:text-3xl">
                <span className='font-extrabold text-primary'>Positive reviews</span> of our clients
                </h1>

                <div className="flex mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-primary rounded-full"></span>
                </div>
            </div>
            </div>
        <div className="lg:-mx-6 lg:flex lg:items-center">
          <div className="lg:w-1/2 lg:mx-6 w-full h-96 rounded-3xl lg:h-[36rem]">
            <img
              className="object-cover object-center w-full h-full rounded-3xl"
              src={currentTestimony.image}
              loading='lazy'
              alt=""
            />
          </div>
          <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0 translate-y-6"
        }}
    >
          <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0" {...handlers}>
            <p className="text-5xl font-semibold text-primary ">&quot;</p>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-black lg:text-3xl lg:w-96">
            {currentTestimony.heading}
            </h1>
            <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-500 ">{currentTestimony.text}</p>
            <h3 className="mt-6 text-lg font-medium text-primary">{currentTestimony.author}</h3>
            <p className="text-gray-600 dark:text-gray-700">{currentTestimony.position}</p>
            <div className="flex items-center justify-between mt-12 lg:justify-start">
              <button
                title="left arrow"
                className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-800 hover:bg-gray-100"
                onClick={prevTestimony}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                title="right arrow"
                className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-800 lg:mx-6 hover-bg-gray-100"
                onClick={nextTestimony}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          </LayoutEffect>
        </div>
      </div>
    </section>
    </LayoutEffect>
  );
};

export default TestimonialSection;
