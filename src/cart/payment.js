// Payment gateway hook-in point.
//
// Checkout calls startOnlinePayment(order) when the reader chooses "Pay Online".
// Replace the body with the real gateway flow (e.g. Razorpay / Cashfree / PhonePe):
//   1. create a gateway order on your server for order.totalAmount
//   2. open the gateway checkout
//   3. resolve { status: 'paid', paymentId } on success, or throw on failure/cancel
//
// Until a gateway is connected, orders are saved as "Awaiting Payment".
export async function startOnlinePayment(order) {
  return { status: 'pending', paymentId: null, orderId: order.id };
}

export const ONLINE_PAYMENTS_ENABLED = false;
