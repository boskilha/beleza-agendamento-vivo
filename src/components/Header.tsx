
import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Serviços", href: "/services" },
    { title: "Agendamento", href: "/booking" },
    { title: "Contato", href: "/contact" }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className={`font-serif text-2xl ${isScrolled ? 'text-purple-900' : 'text-white'}`}>
            Beleza Vivo
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link 
                key={item.title} 
                to={item.href} 
                className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-purple-500 transition-colors uppercase tracking-wide text-sm font-medium`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant={isScrolled ? "outline" : "ghost"} className={isScrolled ? "border-purple-800 text-purple-800" : "text-white border-white"}>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild className={isScrolled ? "bg-purple-800 hover:bg-purple-900" : "bg-white text-purple-900 hover:bg-gray-100"}>
              <Link to="/register">Cadastrar</Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? "text-purple-900" : "text-white"}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-6 mt-12">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-lg font-serif tracking-wider hover:text-purple-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-6 space-y-4">
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Entrar
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-purple-800 hover:bg-purple-900">
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
