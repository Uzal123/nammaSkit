import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserStore } from "../store/auth";

export const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const user = useUserStore((state) => state.user);

    useEffect(() => {
      if (!user.id) {
        router.push("/login");
      }
    }, [router, user.id]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};
