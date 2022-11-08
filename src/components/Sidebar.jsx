import React from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/links";

const activeLink = "bg-sidebarActive rounded-xl text-blue-300";
const normalLink = "text-white";

const SidebarItems = () => {
  return links.map((item) => {
    return (
      <NavLink
        key={item.title}
        to={`/${item.title}`}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <div
          className="
          flex items-center p-2 font-normal text-2xl py-3
         hover:bg-sidebarHover rounded-xl transition-colors"
        >
          <span className="px-3">{item.icon}</span>
          <span className="capitalize">{item.title}</span>
        </div>
      </NavLink>
    );
  });
};

const Sidebar = () => {
  console.log(links);
  return (
    <>
      <nav
        className="
          h-screen overflow-auto flex flex-col
          w-72 bg-sidebarBlue p-3"
      >
        {SidebarItems()}
      </nav>
    </>
  );
};

export default Sidebar;
