import CustomerForm from '../components/forms/CustomerForm'

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="text-muted-foreground mt-2">Completa tu pedido de forma segura.</p>
      <div className="mt-6 max-w-md">
        <CustomerForm onSubmit={(values) => {
          // Aquí luego integraremos el flujo de pedido
          console.log('Cliente', values)
        }} />
      </div>
    </div>
  );
}


