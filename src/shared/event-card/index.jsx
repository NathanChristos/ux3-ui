import { useState } from "react";
import { Button } from "../button";
import { EditEventCard } from "../../components/edit-event-card";
import { ChevronDownIcon } from "../../assets/icons/chevron-down";
import { ChevronUpIcon } from "../../assets/icons/chevron-up";

export const EventCard = ({ event, onUpdate, onPurchase, admin = false, booking = {} }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  
  const friendlyDate = new Date(event.dateTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className="mb-6">
      {editing ? 
      (
        <EditEventCard event={event}
          onSuccess={() => {
            setEditing(false);
            onUpdate();
          }} 
          onClose={() => {
            setEditing(false);
          }}
        />
      ) : (
        <div key={event._id} className="bg-neutral-50/75 shadow-inner shadow-gray-900 rounded-3xl p-6">
          <div className="hover:cursor-pointer" onClick={() => setOpen(!open)}>
            <div className="sm:flex justify-between">
              <div className="flex w-full flex-col mb-6 font-bold text-start">
                <div className="text-2xl mb-2">{event.name}</div>
                <div className={"w-fit bg-primary text-white px-2 mb-2"}>{friendlyDate}</div>
                <div>
                  <span className="mr-3">{event.price ? `$${event.price}` : 'Free entry'}</span><span>{`Avaliable tickets: ${event.tickets}`}</span>
                </div>
                <p>{event.address}</p>
                <span className="capitalize">{event.location}</span>
                <div>
                  {booking?.tickets && (
                    <div className="text-primary text-xl mt-2">{`You have ${booking.tickets} ticket${booking.tickets > 1 ? 's' : ''} for this event`}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-center"><img src={event.picture} alt="event" className="sm:h-40 sm:max-w-40 sm:w-40 rounded-2xl mb-6 shadow-lg shadow-gray-500" /></div>
            </div>
            <div className={`text-neutral-700 mb-6 overflow-hidden ${open ? 'h-fit' : 'max-h-20'}`}>
              {event.description}
            </div>
            <div className="w-full justify-items-center mb-6 text-primary">
            { open ? (<ChevronUpIcon/>) : (<ChevronDownIcon/>)}
            </div>
          </div>
          {open && (
            <>
            { admin ? (
              <div className="flex justify-end border-t border-neutral-400 pt-6">
                <Button variant={'primary'} onClick={() => setEditing(true)}>{'Edit'}</Button>
              </div>
              ) : (
              <div className="flex justify-end border-t border-neutral-400 pt-6">
                <div className="flex">
                  <div className="flex bg-neutral-100 h-11 w-32 mr-6 rounded-lg text-3xl text-primary">
                    <div className="h-11 w-11 pl-4 pt-1 hover:cursor-pointer" onClick={() => setTicketCount(ticketCount - 1 || 1)}>-</div>
                    <div className=" bg-white h-9 w-9 mt-1 text-center rounded-md border border-neutral-300 text-black">{ticketCount}</div>
                    <div className="mx-auto mt-[2px] hover:cursor-pointer" onClick={() => setTicketCount(ticketCount + 1)}>+</div>
                  </div>
                  <Button variant={'primary'} onClick={() => onPurchase(event, ticketCount)}>{`Purchase ticket${ticketCount > 1 ? 's' : ''}`}</Button>
                </div>
              </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}