import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full absolute top-[500vw]">
      <footer className="bg-white dark:bg-gray-600 dark:bg-opacity-10 m-4">
        <div className="w-full max-w-[90%] mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="/images/logo.png"
                className="h-8"
                alt="Flixify Logo"
                height={100}
                width={100}
              />
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              Flixify
            </Link>
            . All Rights Reserved.
          </span>
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Made with ❤ by Abhishek Singh{" "}
            <Link
              href="https://abhishek-singh-dev.vercel.app/"
              target="_blank"
              className="text-orange-500 font-bold"
            >
              (Portfolio)
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
