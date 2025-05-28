import { useMemo, useState } from "react";
import { useEvents } from "../../hooks/useEvent";
import { useBookings } from "../../hooks/useBookings";
import { EventCard } from "../../shared/event-card";
import { EditEventCard } from "../../components/edit-event-card";
import { Input } from "../../shared/input";
import { route } from "../../shared/api";
import { LoadingSpinner } from "../../shared/loading-spinner";
import { useContext } from "../../context/context";

export const FindEvents = ({ tab }) => {
  const { user, search: { maxPrice, location }, updateSearch } = useContext();
  const [newEvent, setNewEvent] = useState(false);  
  const { events, rehydrate, loading } = useEvents(true);
  const { bookingsMap, rehydrate: rehydrateBookings } = useBookings();
  
  const filteredEvents = useMemo(() => events.filter(event => {
    const priceMatch = maxPrice ? event.price <= parseFloat(maxPrice) : true;
    const locationMatch = location ? event.location.toLowerCase().includes(location.toLowerCase()) : true;
    const addressMatch = location ? event.address.toLowerCase().includes(location.toLowerCase()) : true;
    return priceMatch && (locationMatch || addressMatch);
  }), [events, maxPrice, location]);
  
  const handlePurchase = (event, tickets) => {
    route(`/events/${event._id}/book`).post({
      body: { tickets },
      onSuccess: (data) => {
        console.log('Purchase successful', data);
        rehydrateBookings();
        rehydrate();
      },
      onError: (error) => {
        console.error('Purchase failed', error);
      }
    });
  };

  return (
    <div className='w-full max-w-[1200px] m-auto h-screen py-20 overflow-scroll'>
      <div className="text-5xl text-center text-neutral-50 mb-6">
        {'Find events'}
      </div>
      { loading ? (<LoadingSpinner />) : (
      <>
        { !newEvent ? (
          <div className="flex justify-between md:-mt-16 mt-0">
            <Input value={maxPrice} onChange={v => updateSearch({maxPrice: v})} placeholder={'max price'} className="max-w-60" />
            <Input value={location} onChange={v => updateSearch({ location: v})} placeholder={'location'} className="max-w-60"/>
          </div>
        ) : (
          <EditEventCard event={null} onSuccess={() => { 
            setNewEvent(false);
            rehydrate();
          }} onClose={() => setNewEvent(false)} />
        )}
        {filteredEvents && filteredEvents.length > 0 ? (
          <div>
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} onUpdate={rehydrate} onPurchase={handlePurchase} booking={bookingsMap[event._id]} admin={user.accessLevel > 1}/>
            ))}
          </div>
        ) : (
          <div className="flex w-full h-[90%]">
          <div className="text-3xl text-white m-auto">{`No events`}</div>    
        </div>
        )}
      </>
      ) }
    </div>
  )
}