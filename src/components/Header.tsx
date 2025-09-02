import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, ShoppingCart, MapPin, Store, Users, Package } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store/store";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bebas tracking-tight text-purple-800 text-4xl">
              Ello
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50", location.pathname === "/" && "bg-accent/50")}>
                    Início
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={location.pathname.startsWith("/services") && "bg-accent/50"}>
                  Serviços
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/services" title="Todos os Serviços">
                      Conheça todos os nossos serviços de beleza e bem-estar
                    </ListItem>
                    <ListItem href="/salons" title="Salões de Beleza">
                      Encontre os melhores salões próximos a você
                    </ListItem>
                    <ListItem href="/services?category=massage" title="Massagem & Relaxamento">
                      Massagens terapêuticas e relaxantes
                    </ListItem>
                    <ListItem href="/services?category=aesthetic" title="Estética & Bem-estar">
                      Tratamentos estéticos e de bem-estar
                    </ListItem>
                    <ListItem href="/booking" title="Agendar Serviço">
                      Reserve seu horário agora mesmo
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={location.pathname.startsWith("/marketplace") && "bg-accent/50"}>
                  Marketplace
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/marketplace" title="Todos os Produtos">
                      Explore nossa seleção completa de produtos locais
                    </ListItem>
                    <ListItem href="/marketplace?category=fashion" title="Moda & Acessórios">
                      Roupas, bolsas e acessórios exclusivos
                    </ListItem>
                    <ListItem href="/marketplace?category=jewelry" title="Joias & Artesanato">
                      Peças únicas feitas por artesãos locais
                    </ListItem>
                    <ListItem href="/marketplace?category=cosmetics" title="Cosméticos Locais">
                      Produtos de beleza artesanais e naturais
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={(location.pathname.startsWith("/lojista") || location.pathname.startsWith("/fornecedor") || location.pathname.startsWith("/salon")) && "bg-accent/50"}>
                  Para Empresas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/lojista/dashboard" title="Seja um Lojista">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4" />
                        Venda seus produtos no marketplace
                      </div>
                    </ListItem>
                    <ListItem href="/fornecedor/dashboard" title="Portal do Fornecedor">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Fornecimento B2B para lojistas
                      </div>
                    </ListItem>
                    <ListItem href="/salon/dashboard" title="Gestão de Salão">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Sistema completo para salões de beleza
                      </div>
                    </ListItem>
                    <ListItem href="/admin/dashboard" title="Painel Admin">
                      Sistema de administração e controle
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <MapPin className="h-5 w-5" />
            <span className="sr-only">Localização</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/marketplace/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && <span className="absolute -top-1 -right-1 bg-purple-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>}
              <span className="sr-only">Carrinho ({cartItemsCount})</span>
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button className="bg-purple-800 hover:bg-purple-900" asChild>
            <Link to="/register">Cadastrar</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <MenuIcon />}
        </Button>
      </div>

      {mobileMenuOpen && <div className="px-4 py-3 lg:hidden bg-white/95 backdrop-blur-md border-t">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="block py-2 text-center rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
              Início
            </Link>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground px-2">Serviços</div>
              <Link to="/services" className="block py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                Todos os Serviços
              </Link>
              <Link to="/salons" className="block py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                Salões de Beleza
              </Link>
              <Link to="/booking" className="block py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                Agendar Serviço
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground px-2">Marketplace</div>
              <Link to="/marketplace" className="block py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                Todos os Produtos
              </Link>
              <Link to="/marketplace/cart" className="flex items-center justify-between py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                <span>Carrinho</span>
                {cartItemsCount > 0 && <span className="bg-purple-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    {cartItemsCount}
                  </span>}
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground px-2">Para Empresas</div>
              <Link to="/lojista/dashboard" className="block py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                Seja um Lojista
              </Link>
              <Link to="/fornecedor/dashboard" className="block py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                Portal do Fornecedor
              </Link>
              <Link to="/salon/dashboard" className="block py-2 pl-4 text-sm rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                Gestão de Salão
              </Link>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Entrar
                </Link>
              </Button>
              <Button className="w-full bg-purple-800 hover:bg-purple-900" asChild>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  Cadastrar
                </Link>
              </Button>
            </div>
          </nav>
        </div>}
    </header>;
};
const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & {
  title: string;
}>(({
  className,
  title,
  children,
  ...props
}, ref) => {
  return <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>;
});
ListItem.displayName = "ListItem";
export default Header;