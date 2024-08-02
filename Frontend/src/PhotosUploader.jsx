import axios from 'axios';
import React, { useState } from 'react'

const PhotosUploader = ({addedPhotos,setAddedPhotos}) => {
    const [photoLink,setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink})
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i])
        }
        axios.post('/upload',data,{
            headers:{'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filename} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filename];
            });
        })
    }
  return (
    <>
      <div className='flex gap-2'>
                        <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='Add image using a link' />
                        <button className='bg-gray-200 rounded-full px-4' onClick={addPhotoByLink}>Add&nbsp;Photo</button>
                    </div>
                    <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div className='h-32 flex' key={link}>
                                <img className='rounded-2xl w-full object-cover' src={"http://localhost:4000/uploads/"+link} alt="bruh" />
                            </div>
                        ))}
                        <label className='items-center justify-center flex cursor-pointer border bg-transparent p-8 text-2xl text-gray-600 rounded-2xl'>
                            <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                            +</label>
                    </div>
    </>
  )
}

export default PhotosUploader
