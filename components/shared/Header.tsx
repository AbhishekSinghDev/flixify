"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

// Shadcn imports
import { Button } from "../ui/button";
import MyAvatar from "./MyAvatar";
import { ModeToggle } from "./DarkmodeToggle";

// constant imports
import { headerNavLinks } from "@/constants/index";
import axios, { AxiosResponse } from "axios";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [profileIcon, setProfileIcon] = useState<string>(
    "https://cdn.prod.website-files.com/63a2cd9595ab8c1aa7aecc08/64c8ceeaa7097c40f3a264ce_HASHTAGArtboard%20132.png"
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/auth/get-token");

        const userId: string = res.data.user.userId || undefined;

        if (userId) {
          setIsLoggedIn(true);
          const res: AxiosResponse<any, any> = await axios.post(
            `/api/user/${userId}`
          );

          const userImageUrl = res.data.user.imageUrl;
          const userFirstWord: string = res.data.user.username[0];
          setUsername(userFirstWord);
          setProfileIcon(userImageUrl);

          return;
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, []);

  return (
    <header className="sticky top-0 z-[9999] bg-black bg-opacity-20">
      <nav className="max-w-[90%] lg:mx-auto sm:p-5 p-3 md:px-10 xl:px-0 w-full flex items-center justify-between ">
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
            <ul className="lg:flex items-center justify-center gap-10 ml-10 hidden text-base">
              {headerNavLinks &&
                headerNavLinks.map((item: { link: string }, index: number) => (
                  <li
                    key={index}
                    className="font-medium cursor-pointer text-white hover:text-green-500"
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
            <MyAvatar fallbackName={username} avatarImage={profileIcon} />
            <ModeToggle />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
