import React,{ useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../../Perks';
import axios from 'axios';
import PhotosUploader from '../../PhotosUploader';

const PlacesPage = () => {
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect ] = useState(false);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    function inputDesc(text){
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header,description){
        return (
            <>
                {inputHeader(header)}
                {inputDesc(description)}
            </>
        )
    }

    

    function addNewPlace(ev){
        ev.preventDefault();
        axios.post('/places', {title, address, addedPhotos,
            description, perks, extraInfo, checkIn,
            checkOut, maxGuests
        });
        setRedirect(true)
    }
    if(redirect){
        return<Navigate to={'/account/places'} />
    }

  return (
    <div>
        {action !== 'new' && (
            <div className='text-center'>
            <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Place
            </Link>
        </div>
        )}
        {action === 'new' && (
            <div>
                <form onSubmit={addNewPlace}>
                    {preInput('Title','A title for your place. Should be short for advertising purposes.')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Title, for example: My Apartment' />
                    <h2 className='text-2xl mt-4'>Address</h2>
                    <p className='text-gray-500 text-sm'>Provide an address for your place. Should be precise. You can also provide a Landmark.</p>
                    <input type="text" value={address} onChange={ec => setAddress(ev.target.value)} placeholder='Address' />
                    <h2 className='text-2xl mt-4'>Photos</h2>
                    <p className='text-gray-500 text-sm'>The more the merrier.</p>
                    <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
                    <h2 className='text-2xl mt-4'>Description</h2>
                    <p className='text-gray-500 text-sm'>Add a brief description for your place.</p>
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                    <h2 className='text-2xl mt-4'>Perks</h2>
                    <p className='text-gray-500 text-sm'>Select the perks provided at your place.</p>
                    <Perks selected={perks} onChange={setPerks} />
                    <h2 className='text-2xl mt-4'>Extra Information</h2>
                    <p className='text-gray-500 text-sm'>House rules, etc.</p>
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                    <h2 className='text-2xl mt-4'>Check in&out Times</h2>
                    <p className='text-gray-500 text-sm'>Add check-in and check-out times. Remember to have a cleaning window between guests.</p>
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div>
                            <h3 className='mt-2 -mb-2'>Check In time</h3>
                            <input type="text" placeholder='15:00' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-2'>Check out time</h3>
                            <input type="text" placeholder='12:00' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-2'>Max number of guests</h3>
                            <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                        </div>
                    </div>
                    <button className='primary'>Save</button>
                </form>
            </div>
        )}
        
    </div>
  )
}

export default PlacesPage
