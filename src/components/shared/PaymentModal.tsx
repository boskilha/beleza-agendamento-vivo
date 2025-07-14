
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, QrCode, Coins } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PaymentModalProps {
  trigger: React.ReactNode;
  total: number;
  onPayment: (method: 'pix' | 'card' | 'mumbuca') => void;
}

const PaymentModal = ({ trigger, total, onPayment }: PaymentModalProps) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const mumbucaBalance = currentUser?.mumbucaBalance || 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Escolha a forma de pagamento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="text-xl font-bold">R$ {total.toFixed(2)}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Button 
              onClick={() => onPayment('pix')}
              className="w-full justify-start gap-3 h-12"
              variant="outline"
            >
              <QrCode className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">PIX</div>
                <div className="text-sm text-gray-500">Pagamento instantâneo</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => onPayment('card')}
              className="w-full justify-start gap-3 h-12"
              variant="outline"
            >
              <CreditCard className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Cartão de Crédito</div>
                <div className="text-sm text-gray-500">Visa, Mastercard, etc.</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => onPayment('mumbuca')}
              className="w-full justify-start gap-3 h-12 bg-green-600 hover:bg-green-700 text-white"
              disabled={mumbucaBalance < total}
            >
              <Coins className="w-5 h-5" />
              <div className="text-left flex-1">
                <div className="font-medium flex items-center gap-2">
                  Moeda Mumbuca
                  <Badge variant="secondary" className="text-xs">
                    Saldo: R$ {mumbucaBalance.toFixed(2)}
                  </Badge>
                </div>
                <div className="text-sm text-green-100">
                  {mumbucaBalance >= total ? "Economia local" : "Saldo insuficiente"}
                </div>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
