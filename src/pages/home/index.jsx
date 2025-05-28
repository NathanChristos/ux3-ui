import { useContext } from "../../context/context";
import findTickets from '../../assets/find-tickets-button.png';
import freeEvents from '../../assets/free-events-button.png';
import hostEvent from '../../assets/host-event-button.png';
import { Button } from "../../shared/button";
import { useBookings } from "../../hooks/useBookings";
import { EventCard } from "../../shared/event-card";
import { LoadingSpinner } from "../../shared/loading-spinner";

export const Home = ({ tab }) => {
  const { user, setPage, updateUser, updateSearch } = useContext();
  const { bookedEvents, bookingsMap, loading } = useBookings();
  
  const handleClick = (page) => {
    setPage(page);
    updateUser({ greeting: true });
  }
  
  const loadFreeEvents = () => {
    setPage(2);
    updateSearch({ maxPrice: '0' });
  }
  
  return (
    <div className='w-full h-screen py-20 text-center overflow-scroll'>
      { user.greeting ? (
        <div className="w-full max-w-[1200px] m-auto h-[90%]">
          <div className="text-5xl text-neutral-50 mb-6">
            {`Hi ${user.firstName}`}
          </div>
          { loading ? (<LoadingSpinner />) : (
            <>
              { bookedEvents && !!bookedEvents.length ? (
              <div className="pb-12">
                {bookedEvents.map((booking) => (
                  <EventCard key={booking.event._id} event={booking.event} booking={bookingsMap[booking.event._id]}/>
                ))}
              </div>
              ) : (
              <div className="flex text-3xl text-white h-[90%]">
                  <div className="flex flex-wrap my-auto w-full justify-center pb-20">
                    <div className="m-8">
                      Find tickets
                      <img src={findTickets} onClick={() => setPage(2)} className="mt-2 h-56 hover:cursor-pointer" alt="logo" />
                    </div>
                    <div className="m-8">
                      Free events
                      <img src={freeEvents} onClick={loadFreeEvents} className="mt-2 h-56 hover:cursor-pointer" alt="logo" />
                    </div>
                    { user.accessLevel > 0 &&
                    <div className="m-8">
                      Host event
                      <img src={hostEvent} onClick={() => setPage(1)} className="mt-2 h-56 hover:cursor-pointer" alt="logo" />
                    </div>
                    }
                  </div>
              </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="flex text-5xl text-neutral-50 h-[90%] justify-center">
          <div className="flex flex-wrap my-auto">
            <div>
              {`Hi ${user.firstName}, Welcome to UpTix!`}
              <div className="text-3xl text-white mt-4">
                <div>{'We are please to have you as part of our community.'}</div> 
                <div>{'Please select an option from the menu to get started.'}</div>
                { user.accessLevel > 0 && <div>{'Host your own event in '}<button className="underline text-primary" onClick={() => handleClick(1)}>My events</button>{' or,'}</div> }
                <div>{'Browse tickets on the '}<button className="underline text-primary" onClick={() => handleClick(2)}>Find events</button>{' page.'}</div>
              </div>
              <div className="text-3xl mt-4">
                <Button onClick={() => handleClick(0)}>Ok!</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}