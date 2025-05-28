import { useEffect, useState } from "react";
import { route } from "../../shared/api";

export const useBookings = () => {
    const [bookedEvents, setBookedEvents] = useState([]);
    const [timestamp, setTimestamp] = useState(Date.now());
    const [loading, setLoading] = useState(true);
    
    const rehydrate = () => {
        setTimestamp(Date.now());
    }
    
    useEffect(()=> {
                setLoading(true);
                route('/events/bookings').get({
                onSuccess: (data) => {
                    setLoading(false);
                    if (data) {
                        setBookedEvents(data);
                    }
                }, onError: (error) => {
                    setLoading(false);
                } 
            })
    }, [timestamp]);
    
    return { bookedEvents, loading, rehydrate, bookingsMap: Object.fromEntries(bookedEvents.map(b => [b.event._id, b])) };
}