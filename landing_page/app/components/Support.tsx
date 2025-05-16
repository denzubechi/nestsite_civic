import React from "react";

const SupportSection = () => {
  return (
    <>
      <section className="m-2 md:m-6 lg:m-10 rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 text-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl tracking-tight font-extrabold leading-tight  ">
              Ready to get those mind-blowing ideas live?
            </h2>
            <p className="mb-6 font-light  md:text-lg">
              Try Nestsite! No coding or design skills needed
            </p>
            <div className="mt-4 inline-flex w-full mt-6 sm:w-auto">
              <a
                href="https://nestsite-app.vercel.app/login"
                className="inline-flex items-center justify-center w-full py-2 px-4 text-white font-medium duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg hover:shadow-none bg-tertiary"
              >
                Get started for free
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportSection;
