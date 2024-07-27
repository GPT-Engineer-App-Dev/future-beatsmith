import { Home, Music } from "lucide-react";
import Index from "./pages/Index.jsx";
import Beatmaker from "./pages/Beatmaker.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Beatmaker",
    to: "/beatmaker",
    icon: <Music className="h-4 w-4" />,
    page: <Beatmaker />,
  },
];
