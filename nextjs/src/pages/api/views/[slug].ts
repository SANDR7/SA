import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug;

    if (req.method === "POST") {
      
      //   const newOrUpdatedViews = await prisma.views.upsert({
      //     where: { slug },
      //     create: {
      //       slug,
      //     },
      //     update: {
      //       count: {
      //         increment: 1,
      //       },
      //     },
      //   });

      //   return res.status(200).json({
      //     total: newOrUpdatedViews.count.toString(),
      //   });
      return res.status(200).json({ msg: "test" });
    }

    if (req.method === "GET") {
      //   const views = await prisma.views.findUnique({
      //     where: {
      //       slug,
      //     },
      //   });
      return res.status(200).json({ msg: "test" });
      //   return res.status(200).json({ total: views.count.toString() });
    }
  } catch (e: { message: string }) {
    return res.status(500).json({ message: e.message });
  }
}
