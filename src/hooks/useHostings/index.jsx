import { useEffect, useState } from "react";
import { route } from "../../shared/api";

export const useHostings = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timestamp, setTimestamp] = useState(Date.now());
    
    const rehydrate = () => {
        setTimestamp(Date.now());
    }
    
    useEffect(()=> {
                setLoading(true);
                route('/events/hostings').get({
                onSuccess: (data) => {
                    if (data) {
                        setLoading(false);
                        setEvents(data);
                    }
                }, onError: (error) => {
                    console.error('Error fetching hostings:', error);
                    setLoading(false);
                }
            })
    }, [timestamp]);
    return { events, rehydrate, loading };
}