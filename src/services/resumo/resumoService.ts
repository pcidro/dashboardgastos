import { prisma } from "../../lib/prisma.js";

interface resumoServiceProps {
  userId: string;
  startDate?: string;
  endDate?: string;
}

export class ResumoService {
  async execute({ userId, startDate, endDate }: resumoServiceProps) {
    const dateFilter =
      startDate || endDate
        ? {
            ...(startDate ? { gte: new Date(startDate) } : {}),
            ...(endDate
              ? {
                  lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)),
                }
              : {}),
          }
        : undefined;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        ...(dateFilter ? { date: dateFilter } : {}),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // 2. Cálculos dos totais consolidados
    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalPago = 0;
    let totalPendente = 0;

    // Agrupamento diário para gráficos
    const diasMap: Record<
      string,
      { data: string; receitas: number; despesas: number; saldo: number }
    > = {};

    // Agrupamento por categoria
    const categoriasMap: Record<
      string,
      { id: string; nome: string; color: string | null; total: number }
    > = {};

    for (const t of transactions) {
      const valor = t.amount;
      const diaStr = t.date.toISOString().slice(0, 10); // YYYY-MM-DD

      // Totais por tipo
      if (t.type === "RECEITA") {
        totalReceitas += valor;
      } else if (t.type === "DESPESA") {
        totalDespesas += valor;
      }

      // Totais por status
      if (t.status === "PAGO") {
        totalPago += valor;
      } else if (t.status === "PENDENTE") {
        totalPendente += valor;
      }

      // Agrupamento por dia
      const diaEntry = diasMap[diaStr] ?? {
        data: diaStr,
        receitas: 0,
        despesas: 0,
        saldo: 0,
      };

      if (t.type === "RECEITA") diaEntry.receitas += valor;
      if (t.type === "DESPESA") diaEntry.despesas += valor;
      diaEntry.saldo = diaEntry.receitas - diaEntry.despesas;
      diasMap[diaStr] = diaEntry;

      // Agrupamento por categoria
      if (t.category) {
        const catEntry = categoriasMap[t.category.id] ?? {
          id: t.category.id,
          nome: t.category.name,
          color: t.category.color,
          total: 0,
        };

        catEntry.total += valor;
        categoriasMap[t.category.id] = catEntry;
      }
    }

    const saldo = totalReceitas - totalDespesas;

    return {
      totais: {
        receitas: totalReceitas,
        despesas: totalDespesas,
        saldo,
        totalTransacoes: transactions.length,
        pago: totalPago,
        pendente: totalPendente,
      },
      evolucaoDiaria: Object.values(diasMap),
      porCategoria: Object.values(categoriasMap),
    };
  }
}
