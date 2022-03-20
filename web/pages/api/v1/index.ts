import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function api(req: any, res: any) {
  res.send({ hallo: "test" });
});
