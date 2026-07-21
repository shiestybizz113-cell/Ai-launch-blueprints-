import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export function CheckoutForm({ amount, onPaymentSuccess }: { amount: number, onPaymentSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/?success=true' },
    });

    if (error) {
      setErrorMessage(error.message || 'An error occurred.');
      setIsProcessing(false);
    } else {
        onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button disabled={!stripe || isProcessing} className="w-full bg-blue-600 text-white py-2 rounded-xl">
        {isProcessing ? 'Processing...' : `Pay $${amount}`}
      </button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </form>
  );
}
