import React, { createContext, useState, useEffect } from "react";
import { getRedirectResult, getAdditionalUserInfo } from "firebase/auth";
import nookies from "nookies";
import Firebase from "@/lib/firebase";
import { trpc } from "@/lib/trpc";
import { User } from "@acme/db";

import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({
  user: null,
  loading: false,
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

const auth = Firebase.getInstance().getAuth();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data, refetch } = trpc.user.getLogged.useQuery(undefined, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  const createUserMutation = trpc.user.create.useMutation({
    onSuccess(data) {
      setUser(data.data);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      setLoading(true);
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });

        const userCredentials = await getRedirectResult(auth);
        if (userCredentials) {
          const additionalUserInfo = getAdditionalUserInfo(userCredentials);
          const isNewUser = additionalUserInfo?.isNewUser;

          if (isNewUser) {
            const response = await createUserMutation.mutateAsync({
              uid: user.uid,
              name: user.displayName ?? "No Name",
              username: user.email?.split("@")[0] ?? uuidv4(),
              email: user.email ?? "No Email",
              image: user.photoURL ?? "",
              emailVerified: user.emailVerified
                ? new Date().toISOString()
                : undefined,
            });

            setUser(response.data);
          } else {
            await refetch();
          }
        } else {
          await refetch();
        }
      }
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
