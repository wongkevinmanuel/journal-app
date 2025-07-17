
const cloudUrl = `https://api.cloudinary.com/v1_1/dgeig1ohh/image/upload`;

const dataAdecuada = ( file: File ): FormData => {
    const formData = new FormData();
    formData.append(`upload_preset`, `react-journal`);
    formData.append(`file`, file);
    return formData;
}

export const fileUpload = async ( file: File ) => {

    if ( !file ) throw new Error('No hay archivo a subir');

    try{
        const response = await fetch( cloudUrl ,{
            method: 'POST',
            body: dataAdecuada(file)
        });
        
        if(!response.ok) throw new Error('NO se pudo subir el archivo de imagen');

        const cloudResponse = await response.json();
        return cloudResponse.secure_url;
    }catch (error) {
        throw new Error('Error al enviar la solicitud a la API. Detalles:'+ error);
    }

}