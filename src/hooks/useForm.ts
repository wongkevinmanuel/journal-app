import  { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
    
    const [formState, setformState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
        //Se dispara cuando el formState cambia
    }, [formState]);

    //useEffect para resetear el formulario 
    //con valores por defecto/ o inilizacion
    //Si el initialForm cambia, se vuelve a inicializar el formulario
    useEffect(() => {
        setformState(initialForm);
    }, [initialForm]);

    //useMemo para evitar que se recalculen los valores del formulario
    const isFormValid = useMemo(() => {
        for(const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue ] !== null ) {
                return false;
            }
        }
        return true;
    }, [formValidation])

    const onInputChange = ({target} : any )=>{ 
        const {name, value} = target;

      setformState({
          ...formState, 
          [name] : value });
    }

    const onResetForm = ()=>{
        setformState(initialForm);
    }

    const createValidators = () =>{
        const formCheckedValues = {};
        //leer todos los nombres del formulario
        for (const formField of Object.keys(formValidations)) {
           const [fn, errorMessage = `Este campo es requerido`] = formValidations[formField];
           //Crea un nuevo campo llamado nombreValid, propiedad computada
           // que tiene como valor el resultado de la funcion fn con el valor del campo formField
           formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null: errorMessage;
        }
        setFormValidation(formCheckedValues);
    }

    return {  
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        formValidation,
        isFormValid,
    }
}