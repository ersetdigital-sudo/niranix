import { getPublicOrder } from "@/lib/db/public-order";

export async function GET(
  _request: Request,
  context: { params: Promise<{ invoice: string }> },
) {
  const { invoice } = await context.params;
  const result = await getPublicOrder(invoice);

  if (!result.order) {
    return Response.json(
      { message: result.error || "Pesanan tidak ditemukan" },
      { status: 404 },
    );
  }

  return Response.json(result.order);
}
