import React from "react";

export default function FooterLink({link, label, children}) {
    return (
      <a href={link || "#"} className="text-white opacity-75 flex items-center hover:scale-110 transform transition-all duration-300 hover:opacity-100">
        {children}
        <span className="ml-2">{label}</span>
      </a>
    )
  }