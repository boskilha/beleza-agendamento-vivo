
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, QrCode } from "lucide-react";

interface PaymentModalProps {
  trigger: React.ReactNode;
  total: number;
  onPayment: (method: 'pix' | 'card') => void;
}

const PaymentModal = ({ trigger, total, onPayment }: PaymentModalProps) => {

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
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
