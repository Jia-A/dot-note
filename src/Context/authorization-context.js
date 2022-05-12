import {
    createContext,
    useContext,
    useEffect,
    useReducer
} from "react";

const AuthContext = createContext(null);

const authReducer = (authState, action) => {
    switch (action.type) {
        case "CHECK_USER":
            return {
                ...authState,
                user: action.payload.user,
                token: action.payload.token,
        };
        case "LOGIN":
            return {
                ...authState,
                user: action.payload.user,
                token: action.payload.token,
        };
        case "SIGNUP":
            return {
                ...authState,
                user: action.payload.user,
                token: action.payload.token,
        };
        case "LOGOUT":
            return { ...authState, user: null, token: null };

        case "CHECK_USER":
            return {
                ...authState,
                user: action.payload.user,
                token: action.payload.token,
            };

        default:
            return authState;
    }
}

const AuthProvider = ({
    children
}) => {
    const [authState, authDispatch] = useReducer(authReducer, {
        user: "",
        token: "",
    });

    const userAuth = () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        authDispatch({
            type: "CHECK_USER",
            payload: {
                user,
                token
            }
        }
        );
    };

    useEffect(() => userAuth(), []);

    return ( 
        <AuthContext.Provider value = {
            {
                authState,
                authDispatch
            }
        } > {
            children
        } </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export {
    AuthProvider,
    useAuth
};