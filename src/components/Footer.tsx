
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Beleza Agendamento</h3>
            <p className="text-gray-300">
              Transformando sua beleza, realçando sua confiança.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Serviços</Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-white transition-colors">Agendamento</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Entrar</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Contato</h4>
            <address className="text-gray-300 not-italic">
              <p>Rua das Flores, 123</p>
              <p>São Paulo, SP</p>
              <p className="mt-2">contato@belezaagendamento.com</p>
              <p>(11) 98765-4321</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Beleza Agendamento. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
