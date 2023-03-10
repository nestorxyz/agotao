import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.headers);
    console.log(req.body);

    return res.status(200).json({
      message: "OK",
    });

    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err);

    if (err.isBoom) {
      const {
        output: { statusCode, payload },
      } = err;

      return res.status(statusCode).json(payload);
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default handler;
