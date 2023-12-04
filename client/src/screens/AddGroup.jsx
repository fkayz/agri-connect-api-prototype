import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar'
import getCookie from '../hooks/getCookie'
import addGroupLogo from '../assets/add_group_logo.png'
import { storage } from '../firebaseConfig'


const AddProduct = () => {

  const [ groupName, setGroupName ] = useState('')
  const [ groupDescription, setGroupDescription ] = useState('')
  const [ groupCoverPhoto, setGroupCoverPhoto ] = useState('')
  const [ groupCoverPhotoLink, setGroupCoverPhotoLink ] = useState('')
  const [ uploadingToFirebase, setUploadingToFirebase ] = useState(false)
  const [ savingToDB, setSavingToDB ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ productImgUploadPrg, setGroupCoverImgUploadPrg ] = useState(0)

  const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))

  const navigate = useNavigate()

  const saveChanges = async (productImgLink) => {
    try{
        const productData = {
            admin_id: currentUser.id,
            name: groupName,
            description: groupDescription,
            profileCover: productImgLink
        }
        setSavingToDB(true)
        const product = await axios.post('http://127.0.0.1:8000/api/communities/add', productData)

        if(product.status === 200){
            navigate('/groups')
        }
    }catch(err){
        setError(true)
        alert('error creating group, try again')
    }finally{
        setSavingToDB(false)
    }
  }

  const uploadGroupCoverImageToFirebase = (img) => {
    setUploadingToFirebase(true)
    const storageRef = ref(storage, `/uploaded_files/groups/image/${img.name}`)
    const uploadTask = uploadBytesResumable(storageRef, img)
    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setGroupCoverImgUploadPrg(progress)
        },
        (err) => { return alert('failed to upload group cover img. try again', err) },
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
                setUploadingToFirebase(false)
                saveChanges(url);
            })
        }
    )
  }

  const saveToDB = (event) => {
    event.preventDefault()
    if(groupCoverPhoto && groupName) uploadGroupCoverImageToFirebase(groupCoverPhoto)
    else alert('Error: provide group details to create a group.')
  }

  const previewGroupCoverImage = (img) => {
      const reader = new FileReader()
      const imgPreview = document.querySelector('#imgPreview')

      reader.onload = (e) => {
          imgPreview.src = e.target.result
          setGroupCoverPhoto(img.files[0])
      }

      reader.readAsDataURL(img.files[0])
  }

  const uploadGroupCoverImage = (e) => {
    previewGroupCoverImage(e.target)
  }

    return (
      <>
        <Navbar />

        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
                <SideNavBar />
            </div>

            <div className='col-md-9'>
              <h3 className='text-muted mb-2'>Add New Group</h3>
                
              <div className='row mt-5'>
                <div className='col-md-3'>
                    <div>
                        <img src={addGroupLogo} id='imgPreview' width='100%' className='product-img rounded' alt='product image' />
                    </div>
                </div>

                <div className='col-md-9'>
                  <div className='p-4 rounded px-4'>
                    <form onSubmit={saveToDB}>
                      <div className='mb-2'>
                          <input value={groupName} onChange={(e) => setGroupName(e.target.value)} type='text' placeholder='Enter group name' className='add-product-inpt form-control' />
                      </div>

                      <div className='mb-2'>
                          <textarea  value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} className='add-product-inpt form-control' placeholder='Enter group description'></textarea>
                      </div>

                      <div className='mb-3'>
                          <label htmlFor="groupCoverImg">Upload group cover image</label>
                          <input type='file' id='groupCoverImg' onChange={uploadGroupCoverImage} className='add-product-inpt form-control' />
                      </div>

                      <div className='mb-3'>
                          {
                              uploadingToFirebase
                              ? <button className='create-product-btn btn btn-success mx-auto d-block mt-3' disabled>
                                  {
                                      savingToDB ? 'Saving...' : `Creating...${productImgUploadPrg}%`
                                  }
                              </button>
                              : <button type='submit' className='create-product-btn btn btn-success mx-auto d-block mt-3'>Create</button>
                          }
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default AddProduct