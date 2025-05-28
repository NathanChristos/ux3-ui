import { useEffect, useState } from "react";
import { route } from "../../shared/api";

export const useUser = (enabled, id) => {
    const [user, setUser] = useState(undefined);
    
    const [timestamp, setTimestamp] = useState(Date.now());
    
    const rehydrate = () => {
        setTimestamp(Date.now());
    }
    
    useEffect(() => {
        if (enabled && id) {
            route(`/users/${id}`).get({
            onSuccess: (data) => {
                if (data) {
                    setUser(data);
                }
            },
            onError: (error) => {
                console.error('Error fetching user:', error);
                setUser(undefined);
            }
        });
        }
    }, [enabled, id, timestamp]);
    
    return { user, rehydrate };
};