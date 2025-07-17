import { ImageList, ImageListItem } from '@mui/material'
import { FC } from 'react';

interface ImageGalleryProps{
  images: string[] | null;
}

export const ImageGallery:FC<ImageGalleryProps> = ({images}) => {
  //images =  (images == null) ? [`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuy1h2bVJ67Q1o9Eh087ukJaV76nL7Dwohw&s`]
  //: images; 

  return (
    <ImageList sx={{width: '100%', height: 100}} cols={2} rowHeight={164}>
        { 
         (images === null || images === undefined || images.length === 0 ) ? 
         <h3>No existen imagenes </h3> 
         :
        images.map((image)=>
            <ImageListItem key={image}>
              <img
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                alt='Imagen de la nota'
                loading="lazy"/>  
            </ImageListItem>)
        }
    </ImageList>
  )
} 