"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
  const router = useRouter();
  return (
    <div>
      profile page
      <button
        className="bg-black text-white rounded-full px-5 ml-5"
        onClick={() => router.push("/signup")}
      >
        Clicked for logout
      </button>
    </div>
  );
}
