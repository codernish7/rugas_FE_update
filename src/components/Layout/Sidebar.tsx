import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, ShoppingBag, Package, BarChart } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex flex-col gap-2 p-4">
        <div className="py-4">
          <h2 className="mb-2 px-2 text-lg font-semibold">Navigation</h2>
          <div className="space-y-1">
            <NavItem
              href="/"
              icon={<Home size={20} />}
              label="Dashboard"
              active={currentPath === "/"}
            />
            <NavItem
              href="/customers"
              icon={<Users size={20} />}
              label="Customers"
              active={currentPath === "/customers"}
            />
            <NavItem
              href="/products"
              icon={<ShoppingBag size={20} />}
              label="Products"
              active={currentPath === "/products"}
            />
            <NavItem
              href="/orders"
              icon={<Package size={20} />}
              label="Orders"
              active={currentPath === "/orders"}
            />
          </div>
        </div>
        <div className="py-4">
          <h2 className="mb-2 px-2 text-lg font-semibold">Reports</h2>
          <div className="space-y-1">
            <NavItem
              href="#"
              icon={<BarChart size={20} />}
              label="Analytics"
              active={false}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;