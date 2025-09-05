import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Início', href: '/' }];
    
    const pathMapping: Record<string, string> = {
      'marketplace': 'Marketplace',
      'services': 'Serviços',
      'salons': 'Salões',
      'booking': 'Agendamento',
      'cart': 'Carrinho',
      'checkout': 'Finalizar Compra',
      'admin': 'Administração',
      'lojista': 'Lojista',
      'fornecedor': 'Fornecedor',
      'dashboard': 'Dashboard',
      'produtos': 'Produtos',
      'pedidos': 'Pedidos',
      'configuracoes': 'Configurações',
      'auth': 'Autenticação'
    };
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = pathMapping[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Don't add href for the last item (current page)
      const href = index === pathSegments.length - 1 ? undefined : currentPath;
      breadcrumbs.push({ label, href });
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          )}
          
          {item.href ? (
            <Link 
              to={item.href}
              className="flex items-center hover:text-foreground transition-colors"
            >
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {item.label}
            </Link>
          ) : (
            <span className="flex items-center text-foreground font-medium">
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;