import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Package } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  activePage?: string;
}

export function Navbar({ activePage }: NavbarProps) {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NanoFi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <Link
              to="/vault"
              className={`text-sm font-medium transition-colors ${
                activePage === "vault"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Vault
            </Link>
            {isAuthenticated && (
              <Link
                to="/profile"
                className={`text-sm font-medium transition-colors ${
                  activePage === "overview" || activePage === "profile"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Profile
              </Link>
            )}
          </div>

          {/* Right side - Auth buttons or user menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/vault"
              className="block text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vault
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className="block text-sm font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <User className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-border space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

