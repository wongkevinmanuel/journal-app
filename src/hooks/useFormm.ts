import  { useEffect, useMemo, useState } from 'react'

//Ejemplo de genericos
//function firstElement<T>(arr: T[]): T{
//    return arr[0];
//}
//const firstNumer = firstElement([1, 2, 3, 4, 5]);
//const firstObject = firstElement([{name: 'John'}, {name: 'Jane'}]);

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setformState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState])

    const isFormValid = useMemo(() => {
        for(const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [formValidation])

    const onInputChange = ({target} : any )=>{ 
        const {name, value} = target;
        setformState({
          ...formState, 
          [name] : value });
    }

    const onResetForm = ()=>{ setformState(initialForm); }

    const createValidators = () =>{
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
           const [fn, errorMessage = `Este campo es requerido`] = formValidations[formField];
           formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null: errorMessage;
           console.log(formCheckedValues);
        }
        setFormValidation(formCheckedValues);
    }
    return {  
        ...formState, formState,
        onInputChange,
        onResetForm,
        ...formValidation, formValidation,isFormValid,
    }
}