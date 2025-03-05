"use client";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-500">Studio Onboard</h2>
          <p className="text-gray-400 mt-2">
            Helping creators, studios, and marketing teams manage and book
            studios efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Onboard Your Studio
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400">Contact Us</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center text-gray-400">
              <Phone className="w-5 h-5 mr-2 text-indigo-400" /> +91 63703 02039
            </li>
            <li className="flex items-center text-gray-400">
              <Mail className="w-5 h-5 mr-2 text-indigo-400" />{" "}
              support@studioonboard.com
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400">Follow Us</h3>
          <div className="flex mt-2 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 text-center pt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Studio Onboard. All rights reserved.
      </div>
    </footer>
  );
}
