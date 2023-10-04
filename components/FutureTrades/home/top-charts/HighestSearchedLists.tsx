import React from "react";
import HighestSearchedItem from "./HighestSearchedItem";

export default function HighestSearchedLists({tradeDatas}:any) {
  return (
    <div
      className="bg-card-primary-clr"
      style={{ height: "224px", borderRadius: "8px" }}
    >
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex text-12 gap-5 text-color-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="css-1sfuac8"
              width={14}
            >
              <path
                d="M5.94 19.574C7.612 21.19 9.806 22 12 22c2.194 0 4.387-.809 6.061-2.426 3.347-3.236 3.347-8.48 0-11.716L12.001 2 5.938 7.858c-3.347 3.235-3.347 8.48 0 11.716z"
                fill="url(#hot-g_svg__paint0_linear_1330_2334)"
              ></path>
              <path
                d="M8.506 18.544A4.911 4.911 0 0012 20a4.91 4.91 0 003.494-1.456 4.992 4.992 0 000-7.03L12 8l-3.494 3.515a4.991 4.991 0 000 7.03z"
                fill="#76808F"
              ></path>
              <path
                d="M3 3.5L5.5 6 8 3.5 5.5 1 3 3.5z"
                fill="url(#hot-g_svg__paint1_linear_1330_2334)"
              ></path>
              <path
                d="M20 7.5L21.5 9 23 7.5 21.5 6 20 7.5z"
                fill="#76808F"
              ></path>
              <path
                d="M1 20l1.5 1.5L4 20l-1.5-1.5L1 20z"
                fill="url(#hot-g_svg__paint2_linear_1330_2334)"
              ></path>
              <defs>
                <linearGradient
                  id="hot-g_svg__paint0_linear_1330_2334"
                  x1="12"
                  y1="22"
                  x2="12"
                  y2="2"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F0B90B"></stop>
                  <stop offset="1" stopColor="#F8D33A"></stop>
                </linearGradient>
                <linearGradient
                  id="hot-g_svg__paint1_linear_1330_2334"
                  x1="5.5"
                  y1="6"
                  x2="5.5"
                  y2="1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F0B90B"></stop>
                  <stop offset="1" stopColor="#F8D33A"></stop>
                </linearGradient>
                <linearGradient
                  id="hot-g_svg__paint2_linear_1330_2334"
                  x1="2.5"
                  y1="21.5"
                  x2="2.5"
                  y2="18.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F0B90B"></stop>
                  <stop offset="1" stopColor="#F8D33A"></stop>
                </linearGradient>
              </defs>
            </svg>
            <span>Highest Searched</span>

            <span
              className="ml-1 px-1 rounded"
              style={{ color: "#F0B90B", background: "#3C2601" }}
            >
              24H
            </span>
          </div>
        </div>
        <div className="my-3">
          {tradeDatas?.coins?.data?.map((item: any, index: number) => (
            <HighestSearchedItem item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
