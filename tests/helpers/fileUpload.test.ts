import { fileUpload } from '../../src/helpers/fileUpload';

describe('Pruebas en fileUpload',() =>{
    test('debe de subir el archivo correctamente a cloudinary', async ()=>{
        const imagenUrl = 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/4/43/Giyu_anime_design.png/revision/latest?cb=20190831073602';
        
        /* let resp;
        try{
            let resp = await fetch(imagenUrl);
        }catch(error){
            console.log(error);
        }
        
        let blob;
        try{
            const blob = await resp.blob();
        }catch(error){
            console.log(error)
        }
        
        const file = new File([blob], 'foto.jpg' , {type: blob.type});
 
        //const url = 'string';
        const url = await fileUpload(file);
        expect( typeof url ).toBe('string'); */
    })
})