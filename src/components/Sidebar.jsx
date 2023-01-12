import React from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/data";
import { ReactComponent as LogoSpark } from "../assets/LogoSpark.svg";
import { useState, useEffect } from "react";
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

const compactSidebarItem = () => {
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
        </div>
      </NavLink>
    );
  });
};

const Sidebar = () => {
  //const [displaySidebar, setDisplaySidebar] = useState(true);
  const [width, setwidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setwidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (width < 1536) {
    return (
      <div className="relative mr-4 w-20 z-10">
        <nav
          className="
            h-screen overflow-auto flex flex-col bg-sidebarBlue p-3 fixed"
        >
          {/* <div className="pt-2 pb-5">
            <LogoSpark />
          </div> */}
          {compactSidebarItem()}
        </nav>
      </div>
    );
  }

  return (
    <div className="relative min-w-80 w-80 mr-4 z-10">
      <nav
        className="
          h-screen overflow-auto flex flex-col
          w-72 bg-sidebarBlue p-3 fixed"
      >
        <div className="pt-2 pb-5">
          <LogoSpark />
        </div>
        {SidebarItems()}
      </nav>
    </div>
  );
};

export default Sidebar;
