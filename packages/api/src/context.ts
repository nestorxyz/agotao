import { prisma } from "@acme/db";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { adminAuth, DecodedIdToken } from "@acme/firebase";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  session: DecodedIdToken | null;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  async function getUserFromHeader() {
    const authorization = opts.req.headers.authorization;
    if (!authorization) return null;

    const token = authorization.split(" ")[1];
    if (!token) return null;

    const decodedIdToken = await adminAuth.verifyIdToken(token);
    if (!decodedIdToken) return null;

    return decodedIdToken;
  }

  const session = await getUserFromHeader();

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
