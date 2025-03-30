
import { useState } from 'react';
import { qrCodeApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, QrCode, Download } from 'lucide-react';
import { IWine } from '@/api/types';

interface WineQRGeneratorProps {
  wine: IWine;
}

const WineQRGenerator = ({ wine }: WineQRGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateQRCode = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const result = await qrCodeApi.generateForWine(wine.id);
      setQrCodeUrl(result.qrCodeUrl);
      toast({
        title: "QR Code Generated",
        description: "Your QR code has been successfully created.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error Generating QR Code",
        description: "There was an issue creating your QR code. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    // Creating an anchor element to trigger download
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `${wine.name.replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Download Started",
      description: "Your QR code is being downloaded.",
      duration: 3000,
    });
  };

  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <h3 className="text-xl font-serif font-bold text-wine-900 mb-4">Interactive QR Code</h3>
        <p className="text-gray-600 mb-4">
          Generate a custom QR code for this wine that links to an interactive AR experience.
          Customers can scan to learn more about the wine's origin, tasting notes, and food pairings.
        </p>
        
        {qrCodeUrl ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img src={qrCodeUrl} alt="Wine QR Code" className="w-48 h-48" />
            </div>
            <Button 
              onClick={downloadQRCode} 
              className="bg-wine-700 hover:bg-wine-800"
            >
              <Download className="mr-2 h-4 w-4" /> Download QR Code
            </Button>
          </div>
        ) : (
          <Button 
            onClick={generateQRCode} 
            className="bg-wine-700 hover:bg-wine-800 w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <QrCode className="mr-2 h-4 w-4" /> Generate QR Code
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WineQRGenerator;
