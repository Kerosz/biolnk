import { isString } from "@biolnk/core";
import { sbClient } from "~/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      const token = req.headers.token;

      // Error handling...
      if (!isString(token)) {
        return res.status(401).json({ message: "Missing auth token." });
      }

      const authUser = await sbClient.auth.api.getUser(token);

      if (authUser.error) {
        return res.status(401).json(authUser.error);
      }
      if (authUser?.data?.id.length < 1) {
        return res.status(401).json({ message: "Unknown user!" });
      }

      const { user, error } = await sbClient.auth.api.deleteUser(
        authUser.data.id,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      if (error) {
        return res.status(401).json(error);
      }

      return res.status(200).json(user);
    }
    default: {
      res.status(405).end();
      break;
    }
  }
};

export default deleteUser;
