
import { Link } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-primary">OrderPro</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Bell size={20} />
        </Button>
        <Button size="icon" variant="ghost">
          <Settings size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            AJ
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-muted-foreground">admin@example.com</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;