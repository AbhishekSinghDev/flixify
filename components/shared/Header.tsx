import React from "react";

import Image from "next/image";
import Link from "next/link";

// Shadcn imports
import { Button } from "../ui/button";
import { MyAvatar } from "./MyAvatar";
import { ModeToggle } from "./DarkmodeToggle";

// constant imports
import { headerNavLinks } from "@/constants/index";

const Header: React.FC = () => {
  const isLoggedIn: boolean = false;

  return (
    <nav className="max-w-[90%] lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between sticky top-0 z-[9999]">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            height={100}
            width={100}
            alt="flixify"
          />
        </Link>

        {isLoggedIn && (
          <ul className="lg:flex items-center justify-center gap-10 ml-10 hidden ">
            {headerNavLinks &&
              headerNavLinks.map((item: { link: string }, index: number) => (
                <li
                  key={index}
                  className="font-medium cursor-pointer text-white"
                >
                  {item.link}
                </li>
              ))}
          </ul>
        )}
      </div>

      {!isLoggedIn ? (
        <div>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center sm:mr-4 sm:gap-5 gap-2">
            <Image
              src="/icons/search.svg"
              alt="search"
              height={24}
              width={24}
              className="m-0 invert"
            />
            <Image
              src="/icons/notification.svg"
              alt="notification"
              height={31}
              width={31}
              className="m-0 invert"
            />
          </div>
          <MyAvatar />
          <ModeToggle />
        </div>
      )}
    </nav>
  );
};

export default Header;
