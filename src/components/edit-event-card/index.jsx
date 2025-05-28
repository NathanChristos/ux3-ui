import { useEffect, useMemo, useState } from "react";
import { Error } from "../../shared/input/error";
import { Input } from "../../shared/input";
import image from '../../assets/concert-bg.jpg';
import { DatePicker } from "../../shared/date-picker";
import { Button } from "../../shared/button";
import { route } from "../../shared/api";
import { toDateInput, toDateTimeInput } from "../../shared/time";

export const EditEventCard = ({ onSuccess, onClose, event }) => {
   
    const [name, setName] = useState(event?.name || '');
    const [description, setDescription] = useState(event?.description || '');
    const [address, setAddress] = useState(event?.address || '');
    const [location, setLocation] = useState(event?.location || '');
    const [price, setPrice] = useState(event?.price || '');
    const [tickets, setTickets] = useState(event?.tickets || '');
    const [dateTime, setDateTime] = useState(event?.dateTime ? toDateTimeInput(event?.dateTime) : '');
    const [saleDate, setSaleDate] = useState(event?.saleDate ? toDateInput(event?.saleDate) : '');
    const [file, setFile] = useState(event?.picture || image);
    
    useEffect(() => {
      console.log('dateTime changed:', dateTime);
    }, [dateTime]);
    
    const handleFileChange = async (fileList) => {
      if (fileList) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setFile(reader.result), false);
        reader.readAsDataURL(fileList[0]);
      }
    };
  
    // load default image if no picture is provided
    useEffect(() => {
      if (!event?.picture) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setFile(reader.result);
        });
    
        fetch(image)
          .then(response => response.blob())
          .then(blob => {
            reader.readAsDataURL(blob);
          });
      }
    }, [event] )
    
    const [createEventError, setCreateEventError] = useState(null);
    
    const updating = !!event;
    
    const handleSubmit = (e) => {
      const data = {
        name,
        description,
        address,
        location,
        price,
        tickets,
        dateTime,
        saleDate,
        file
      }
      if (updating) { 
        route(`/events/${event._id}`).put({
          body: data,
          onSuccess: (data) => {
            onSuccess();
          },
          onError: (error) => {
            setCreateEventError(error);
          }
        });
      } else {
        route('/events').post({
          body: data,
          onSuccess: (data) => {
            onSuccess();
          },
          onError: (error) => {
            setCreateEventError(error);
          }
        });
      }
    }
    
    const handleDelete = () => {
      route(`/events/${event._id}`).delete({
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          setCreateEventError(error);
        }
      });
    }
    
    const enabled = useMemo(() => {
        return name && description && address && location && tickets && dateTime && saleDate;
      }
    , [name, description, address, location, tickets, dateTime, saleDate]);
    
    return (
      <div className="flex w-full">
        <div className="w-full bg-neutral-50/75 shadow-inner shadow-gray-900 rounded-3xl p-8">
          <Error>{createEventError?.name?.msg}</Error>
          <Input value={name} errorText="" onChange={setName} placeholder={'name'}/>
          <Error>{createEventError?.description?.msg}</Error>
          <div className="block sm:flex">
            <textarea value={description} onChange={({currentTarget}) => setDescription(currentTarget.value)} className="h-40 rounded-3xl w-m" placeholder="description"></textarea>
            <div className="flex mt-6 sm:mt-0 sm:ml-6 grow">
                <img src={file} alt="event" className="hover:cursor-pointer sm:h-40 sm:max-w-40 sm:w-40 m-auto object-cover rounded-3xl" onClick={() => document.querySelector('input[type="file"]').click()}/>
                <input type="file" hidden onChange={e => handleFileChange(e.target.files)} />
            </div>
          </div>
              <Error>{createEventError?.address?.msg}</Error>
              <Error>{createEventError?.location?.msg}</Error>
          <div className="block sm:flex mt-6">
            <div className="flex grow">
              <Input value={address} onChange={setAddress} placeholder={'address'} className="sm:mr-3"/>
            </div>
            <div className="flex grow">
              <Input value={location} onChange={setLocation} placeholder={'location'} className="sm:ml-3"/>
            </div>
          </div>
            <Error>{createEventError?.tickets?.msg}</Error>  
          <div className="block sm:flex">
            <Input type="number" value={price} onChange={setPrice} placeholder={'price'} className="sm:mr-3"/>
            <Input type="number" value={tickets} onChange={setTickets} placeholder={'number of tickets'} className="sm:ml-3"/> 
          </div>
          <div className="block sm:flex">
            <DatePicker value={dateTime}  onChange={setDateTime} placeholder={'event date'} time={true} className="sm:mr-3"/>
            <DatePicker value={saleDate} onChange={setSaleDate} placeholder={'sale start date'} className="sm:ml-3"/>
          </div>
          <div className="flex justify-between border-t border-neutral-400 pt-6">
            <Button variant={'secondary'} onClick={onClose}>Close</Button>
            { event && <Button variant={'secondary'} onClick={handleDelete}>Delete</Button> } 
            <Button variant={'primary'} onClick={handleSubmit} disabled={!enabled}>{updating ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      </div>
    )
}