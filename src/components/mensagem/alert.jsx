

import React, { Fragment, useState } from 'react'
//import { warning } from 'react-router/lib/router';
import check from '../../assets/img/check.svg';
import error from '../../assets/img/error.svg';
import info from '../../assets/img/info.svg';
import warning from '../../assets/img/warning.svg';

const Alert = ( porps ) =>{
    console.log(porps, 'alert')
    const {show, mensagem, setShow, tipo} = porps;

    const [showAlert, setShowAlert] = useState(true);

    let icon;

    const onCloseAlert = () => {
        setShowAlert(!showAlert);
        setShow();
    }

    if (tipo == 'sucess'){
        icon = check;    
    } else if (tipo == 'info'){
        icon = info;
    } else if (tipo == 'warning'){
        icon = warning;
    } else if (tipo == 'danger'){
        icon = error;
    }


    return(
        <Fragment>
            {
                show && showAlert && (
                    <div onClick={()=>onCloseAlert()} className={`alert alert-${tipo} alert-dismissible fade show rounded`}>
                        <img src={icon} className='show-imagem'/>
                        <span>
                            <strong className=''>
                                {mensagem}
                            </strong>
                        </span>
                    </div>
               )
            }
        </Fragment>
    )
}

export default Alert