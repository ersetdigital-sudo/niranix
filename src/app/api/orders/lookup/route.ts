import { getOrdersByTarget } from "@/lib/db/server";
import { getPublicOrder } from "@/lib/db/public-order";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (!query) {
    return Response.json({ message: "Kode transaksi kosong" }, { status: 400 });
  }

  const direct = await getPublicOrder(query);
  if (direct.order) return Response.json(direct.order);

  if (!/\d{6,}/.test(query.replace(/\D/g, ""))) {
    return Response.json(
      { message: direct.error || "Pesanan tidak ditemukan" },
      { status: 404 },
    );
  }

  const byTarget = await getOrdersByTarget(query);
  const ref = byTarget.data?.[0]?.ref;
  if (!ref) {
    return Response.json(
      { message: "Pesanan tidak ditemukan" },
      { status: 404 },
    );
  }

  const result = await getPublicOrder(ref);
  if (!result.order) {
    return Response.json(
      { message: result.error || "Pesanan tidak ditemukan" },
      { status: 404 },
    );
  }
  return Response.json(result.order);
}
