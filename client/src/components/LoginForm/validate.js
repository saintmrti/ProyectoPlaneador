export const validate = el => {
    const errors = {};

    if(!el.email){
        errors.email = 'Ingrese su correo'
    } else if(!el.email.match(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g)){
        errors.email = 'Correo no válido';
    }

    if(!el.password) {
        errors.password = 'Ingrese su contraseña';
    } 
    
    return errors;
};