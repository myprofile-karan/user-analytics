export const generateRandomAnalyticsData = () => {
    const randomData = [];
    for (let i = 1; i <= 12; i++) {
      randomData.push({
        month: new Date(2024, i - 1).toLocaleString("default", { month: "short" }),
        value: Math.floor(Math.random() * 1000), // Random value between 0 and 1000
      });
    }
    return randomData;
  };
  