import React from "react";
import { useState } from "react";
import {
  ChatIcon,
  DownTriangleIcon,
  ProfileWithCircleIcon,
  LogoutIcon,
  ShopIcon,
} from "../../icons/icon";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { useMerchant } from "../../feature/auth/contexts/MerchantContext";
import { toast } from "react-toastify";
import * as Token from "../../../src/utils/local-storage";
import { useParams } from "react-router-dom";

export default function HeaderToggleMerchant() {
  const { merchant, setMerchant } = useMerchant();

  const [isToggle, setIsToggle] = useState(false);
  const [isUserToggle, setIsUserToggle] = useState(false);

  const dropdown = useRef(null);

  const firstName = merchant?.name?.split(" ")[0];
  const { restaurantId } = useParams();

  const logout = () => {
    setMerchant(null);
    Token.clearTokenMerchant();
    toast.success("Logout successful");
    console.log("*/************************************");
    navigator("/merchant/login");
  };

  useEffect(() => {
    if (isToggle) {
      const handleClickOutSide = (e) => {
        if (dropdown.current && !dropdown.current.contains(e.target))
          setIsToggle(false);
      };
      document.addEventListener("mouseup", handleClickOutSide);
      return () => document.removeEventListener("mouseup", handleClickOutSide);
    }
  }, [isToggle]);

  useEffect(() => {
    if (isUserToggle) {
      const handleClickOutSide = (e) => {
        if (dropdown.current && !dropdown.current.contains(e.target))
          setIsUserToggle(false);
      };
      document.addEventListener("mouseup", handleClickOutSide);
      return () => document.removeEventListener("mouseup", handleClickOutSide);
    }
  }, [isUserToggle]);

  return (
    <div className="flex gap-2 relative z-40" ref={dropdown}>
      {merchant ? (
        <>
          <div
            // to={"/login"}
            className="flex justify-center items-center border border-10 border-gray-300 rounded-full px-2"
          >
            <div className="flex gap-2">
              <ShopIcon />

              <div className="font-bold">{firstName}</div>
            </div>
          </div>
          <Link
            to={`/merchant/chat/${restaurantId}`}
            className="border rounded-full px-2 cursor-pointer"
          >
            <ChatIcon className="w-6 h-6 mt-2" />
          </Link>
          <div
            className="border rounded-full px-2 cursor-pointer"
            onClick={() => {
              setIsUserToggle((c) => !c);
            }}
          >
            <DownTriangleIcon className="w-6 h-6 mt-2" />
          </div>
        </>
      ) : (
        <>
          <Link
            to={"/login"}
            className="flex justify-center items-center border border-10 border-gray-300 rounded-full px-2"
          >
            <ProfileWithCircleIcon />
            <div>เข้าสู่ระบบ</div>
          </Link>
          <div
            className="border rounded-full px-2 cursor-pointer"
            onClick={() => setIsToggle((c) => !c)}
          >
            <DownTriangleIcon className="w-6 h-6 mt-2" />
          </div>
        </>
      )}

      {isToggle ? (
        <>
          <div className="absolute top-10 right-0">
            <div className="w-72 bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col gap-4 mt-2">
                <Link
                  to={"/merchant/login"}
                  className="bg-red_primary px-6 py-2 text-center text-white rounded-lg cursor-pointer"
                >
                  เข้าสู่ระบบ หรือ สมัครสมาชิก
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {isUserToggle && merchant ? (
        <>
          <div className="absolute top-10 right-0">
            <div className="w-72 bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col gap-4 mt-2">
                <div
                  className="flex gap-4 cursor-pointer pl-5"
                  onClick={logout}
                >
                  <LogoutIcon />
                  <div>ออกจากระบบ</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
