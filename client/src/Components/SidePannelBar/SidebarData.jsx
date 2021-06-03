import React from "react";
import * as AiIcons from "react-icons/ai";
import * as GoIcons from "react-icons/go";

export const SidebarData = [
  {
    id: 1,
    title: "Home",
    Path: "/",
    icon: <GoIcons.GoHome />,
    cName: "nav-text",
  },
  {
    id: 2,
    title: "MyAccount",
    Path: "/MyAccount",
    icon: <AiIcons.AiOutlineComment />,
    cName: "nav-text",
  },

  // {
  //   id: 3,
  //   title: "Login/SingUp",
  //   Path: "/LoginAndSingUp",
  //   icon: <AiIcons.AiOutlineLogin />,
  //   cName: "nav-text",
  // },
];
