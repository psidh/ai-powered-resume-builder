import React from "react";

function Home() {
  return (
    <div className="flex flex-col ">
      {/* Navbar */}
      <nav className="bg-white  px-8 py-6 flex justify-between items-center">
        <h1 className="text-xl font-medium text-yellow-600">Agni</h1>
        <ul className="flex space-x-6 text-neutral-500">
          <a href="/" className=" hover:text-yellow-500 cursor-pointer">Home</a>
          <a href="/#about" className=" hover:text-yellow-500 cursor-pointer">About</a>
          <a href="#how" className=" hover:text-yellow-500 cursor-pointer">How It Works</a>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="gap-8 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-200 flex flex-col items-center justify-center h-[100vh] text-center text-white">
        <h2 className="relative text-6xl font-medium text-yellow-900">
          Agni - AI Powered Resume Builder
        </h2>
        <button className="bg-yellow-600 mt-24 px-8 text-xl py-3 rounded-full text-white">Get Started</button>
      </header>

      {/* About Section */}
      {/* About Section */}
      <section className="h-[100vh] py-16 px-6 flex flex-col items-center justify-center text-center" id="about">
        <h2 className="text-4xl font-medium text-yellow-600 mb-6">What is this?</h2>
        <p className="max-w-2xl text-lg font-light text-neutral-500">
          This is a modern, minimal, and responsive landing page designed to
          showcase your product or idea with a Google-like aesthetic. We focus
          on simplicity, functionality, and a clean user experience.
        </p>

        {/* Cards Container */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Card 1 */}
          <div className="bg-white border rounded-lg p-6 text-center">
            <h3 className="text-2xl font-medium text-yellow-600">Minimal UI</h3>
            <p className="text-neutral-500 font-light mt-2">
              Designed with simplicity and efficiency in mind to provide a
              seamless user experience.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white  border rounded-lg p-6 text-center">
            <h3 className="text-2xl font-medium text-yellow-600">
              Fast & Responsive
            </h3>
            <p className="text-neutral-500 font-light mt-2">
              Optimized for performance and adaptability across all screen
              sizes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white  border rounded-lg p-6 text-center">
            <h3 className="text-2xl font-medium text-yellow-600">
              Easy to Use
            </h3>
            <p className="text-neutral-500 font-light mt-2">
              An intuitive interface that requires no learning curve, just start
              and go!
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-10 px-8 py-3 bg-yellow-600 text-white text-lg font-normal rounded-full  hover:bg-yellow-700 transition duration-300">
          More Info
        </button>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 border-t border-neutral-200" id="how">
        <h2 className="text-3xl font-medium text-yellow-700 text-center">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="bg-white border rounded-lg p-6 w-80 text-center">
            <h3 className="text-xl font-medium text-yellow-600">Step 1</h3>
            <p className="text-neutral-500 font-light">Sign up and explore the features.</p>
          </div>
          <div className="bg-white border rounded-lg p-6 w-80 text-center">
            <h3 className="text-xl font-medium text-yellow-600">Step 2</h3>
            <p className="text-neutral-500 font-light">
              Customize your experience to fit your needs.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-6 w-80 text-center">
            <h3 className="text-xl font-medium text-yellow-600">Step 3</h3>
            <p className="text-neutral-500 font-light">
              Enjoy a seamless and intuitive interface.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-900 text-white p-6 text-center mt-auto">
        <p>© 2025 Agni. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
