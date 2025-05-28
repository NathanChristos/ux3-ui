import { useEffect, useState } from "react";
import { route } from "../../shared/api";

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [timestamp, setTimestamp] = useState(Date.now());
    const [loading, setLoading] = useState(true);
    
    const rehydrate = () => {
        setTimestamp(Date.now());
    }
    
    useEffect(()=> {
                setLoading(true);
                route('/events').get({
                onSuccess: (data) => {
                    setLoading(false);
                    if (data) {
                        setEvents(data);
                    }
                }, onError: (error) => {
                    setLoading(false);
                    console.error('Failed to fetch events:', error);
                }
            })
    }, [timestamp]);
    return { events, rehydrate, loading };
}