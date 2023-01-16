import withJoi from "next-joi";
import boom from "@hapi/boom";

export default withJoi({
  onValidationError: (req, res, error) => {
    console.log(error);

    const boomError = boom.badRequest(error.message, error.details);

    res.status(boomError.output.statusCode).json(boomError.output.payload);
  },
});
