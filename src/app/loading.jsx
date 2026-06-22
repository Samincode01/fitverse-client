"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {

  return (

    <div className="min-h-screen bg-[#030312] flex items-center justify-center">

      <div className="text-center">

        <Spinner size="lg" color="warning" />

        <p className="text-white mt-6 text-lg">

          Loading...

        </p>

      </div>

    </div>

  );

}