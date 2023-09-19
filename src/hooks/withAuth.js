import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";

const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const router = useRouter();

        useEffect(() => {
            const { token } = parseCookies();
            if (!token) {
                router.replace("/login");
            }
        }, []);

        return <Component {...props} />;
    }

    return AuthenticatedComponent;
}

export default withAuth;