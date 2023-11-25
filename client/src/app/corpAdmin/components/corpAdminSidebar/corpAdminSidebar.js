"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faClock } from "@fortawesome/free-regular-svg-icons";
import Sidebar from "@/adminStyles/sidebar/sidebar";

export default function CorpAdminSidebar() {
  const links = [
    {
      href: "/corpAdmin/corpAdminWaitingList",
      label: "웨이팅 관리",
      icon: <FontAwesomeIcon icon={faClock} />,
    },
    {
      href: "/corpAdmin/corpAdminReservations",
      label: "사전예약 관리",
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    },
  ];

  const pathname = usePathname();
  const isActive = (path) => (pathname === path ? "active" : "");

  const sidebarContent = (
    <ul>
      {links.map(({ href, label, icon }) => (
        <li key={label}>
          <Link href={href} className={isActive(href)}>
            {icon} {label}
          </Link>
        </li>
      ))}
    </ul>
  );
  return <Sidebar sidebarContent={sidebarContent} />;
}