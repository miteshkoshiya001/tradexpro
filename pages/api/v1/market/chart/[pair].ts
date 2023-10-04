import { getChart } from "service/NextApi/public";

export default async function handler(req: any, res: any) {
  const { pair } = req.query;
  if (req.method === "GET") {
    const response = await getChart(pair);
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: "404 not found", success: false });
  }
}
