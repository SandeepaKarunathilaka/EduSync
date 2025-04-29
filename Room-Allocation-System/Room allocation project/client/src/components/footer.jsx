import React from "react";

export default function Footer() {
  return (
    <div className="bg-blue-100 mt-10">
      <section className="py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-10 px-6">
          {/* Logo and About */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="w-16 h-16 bg-gray-400 rounded-full"></div> {/* Placeholder for footer logo */}
            <div className="text-gray-600 text-center md:text-left">
              Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.
            </div>
            <div className="flex gap-4 text-gray-600 text-2xl">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
            </div>
          </div>

          {/* Our Categories */}
          <div>
            <ul className="space-y-2 text-center md:text-left">
              <li className="text-lg font-bold text-gray-700">Our Categories</li>
              <li className="text-gray-600 pt-2">Factory Uniforms</li>
              <li className="text-gray-600">School Uniforms</li>
              <li className="text-gray-600">Military Uniforms</li>
              <li className="text-gray-600">Military Uniforms</li>
              <li className="text-gray-600">Towels</li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <ul className="space-y-2 text-center md:text-left">
              <li className="text-lg font-bold text-gray-700">Our Services</li>
              <li className="text-gray-600 pt-2">Online Marketplace</li>
              <li className="text-gray-600">Free Delivery</li>
              <li className="text-gray-600">Packaging</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <ul className="space-y-2 text-center md:text-left">
              <li className="text-lg font-bold text-gray-700">Contact Us</li>
              <li className="text-gray-600 pt-2">info@pti.com</li>
              <li className="text-gray-600">No 623, Piliyandala Road, Katubedda</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
