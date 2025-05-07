
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Serviços", href: "/services" },
    { title: "Agendamento", href: "/booking" },
    { title: "Contato", href: "/contact" }
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">Beleza Vivo</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.title} 
                to={item.href} 
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Cadastrar</Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-lg font-medium px-2 py-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-4 space-y-4">
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Entrar
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      Cadastrar
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
