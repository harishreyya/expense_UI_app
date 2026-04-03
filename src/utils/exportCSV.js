export const exportToCSV = (data) => {
  const headers = ["Date", "Category", "Type", "Amount"];

  const rows = data.map((t) => [
    t.date,
    t.category,
    t.type,
    t.amount,
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.setAttribute("href", url);
  a.setAttribute("download", "transactions.csv");
  a.click();
};