import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NanoFi</h3>
            <p className="text-sm text-muted-foreground">
              IP-NFT Tokenization Platform
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/vault" className="hover:text-foreground">
                  Vault
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-foreground">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  API Reference
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NanoFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

