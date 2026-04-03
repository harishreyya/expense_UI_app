export const getHighestSpendingCategory = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  let maxCategory = null;
  let maxAmount = 0;

  for (let key in map) {
    if (map[key] > maxAmount) {
      maxAmount = map[key];
      maxCategory = key;
    }
  }

  return { category: maxCategory, amount: maxAmount };
};

export const getMonthlyComparison = (transactions) => {
  const months = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);

    const key = date.toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    });

    if (!months[key]) {
      months[key] = {
        income: 0,
        expense: 0,
        date: new Date(date.getFullYear(), date.getMonth()), // important
      };
    }

    if (t.type === "income") months[key].income += t.amount;
    else months[key].expense += t.amount;
  });

  const sortedMonths = Object.entries(months).sort(
    (a, b) => a[1].date - b[1].date
  );

  if (sortedMonths.length < 2) return null;

  const prev = sortedMonths[sortedMonths.length - 2];
  const curr = sortedMonths[sortedMonths.length - 1];

  return {
    prevMonth: prev[0],
    currMonth: curr[0],
    prevData: prev[1],
    currData: curr[1],
  };
};