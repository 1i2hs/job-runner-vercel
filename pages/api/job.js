// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { crawl } from "../../jobs";

export default async (req, res) => {
  try {
    const { title, description, address, selector } = req.query;

    if (
      title === undefined ||
      address === undefined ||
      selector === undefined
    ) {
      res.statusCode = 400;
      res.json({
        msg:
          'You must provide query parameter of "title", "address", and "selector"',
      });
      return;
    }

    await crawl(title, description, { address, selector });

    res.statusCode = 200;
    res.json({
      msg: "Success",
    });
    return;
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({
      msg: "Could not execute a job due to an internal errors",
    });
    return;
  }
};
