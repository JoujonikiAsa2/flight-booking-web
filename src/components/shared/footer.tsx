import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 bg-card py-4">
        <div className="max-w-[80rem] mx-auto w-full px-[5vw] flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FlyBuddy. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
      </div>
    </footer>
  );
}
