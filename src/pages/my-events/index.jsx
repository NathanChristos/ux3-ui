import { useState } from "react";
import { Button } from "../../shared/button";
import { EventCard } from "../../shared/event-card";
import { EditEventCard } from "../../components/edit-event-card";
import { useHostings } from "../../hooks/useHostings";
import { LoadingSpinner } from "../../shared/loading-spinner";

export const MyEvents = ({ tab }) => {
  const [newEvent, setNewEvent] = useState(false);  
  const { events, rehydrate, loading } = useHostings();


  return (
    <div className='w-full max-w-[1200px] m-auto h-screen py-20 overflow-scroll'>
      <div className="text-5xl text-center text-neutral-50 mb-6">
        {'My events'}
      </div>
      { loading ? (<LoadingSpinner />) : (
      <>
      { !newEvent ? (
        <div className="flex justify-center sm:justify-end sm:-mt-16 mt-0">
          <Button onClick={() => setNewEvent(true)}>Create event</Button>
        </div>
      ) : (
        <EditEventCard event={null} onSuccess={() => { 
          setNewEvent(false);
          rehydrate();
        }} onClose={() => setNewEvent(false)} />
      )}
      {events && events.length > 0 ? (
        <div className="mt-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onUpdate={rehydrate} admin={true}/>
          ))}
        </div>
      ) : (
        <div className="flex w-full h-[90%]">
          <div className="text-3xl text-white m-auto">{`You don't have any events yet`}</div>    
        </div>
      )}
      </>
      )}
    </div>
  )
}