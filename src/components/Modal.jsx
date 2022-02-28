import { useState } from 'react';

import './Modal.css';

export default function Modal(props) {
    const [ taskValue, setTaskValue ] = useState(props.attributesModal.text);

    const verifyKey = ({ code }) => {
        if ( code !== 'Enter' ) return;

        validateInput();
    };

    const validateInput = () => {
        setTaskValue(taskValue.trim());

        if ( taskValue === '' ) return;

        if ( props.attributesModal.type.add ) {
            addNewTask();

        } else if ( props.attributesModal.type.edit ) {
            editTask(props.attributesModal.idTaskEdit);
        };
    };

    const addNewTask = () => {
        const newTask = {
            text: taskValue,
            id: props.taskID,
            finished: false
        };

        props.setAllTasks([ ...props.allTasks, newTask ]);

        setTaskValue('');
        props.setTaskID( state => state + 1 );

        props.attributesModal.hideModal();
    };

    const editTask = id => {
        props.allTasks.map( task => {
            if ( task.id === id ) {
                task.text = taskValue
                props.setAllTasks([ ...props.allTasks ]);
            };
        });
        props.attributesModal.hideModal();
    };

    const handleDisableModal = ({ target }) => {
        if( target.id !== 'area-modal' && target.id !== 'cancel-button-modal' ) return;

        props.attributesModal.hideModal();
    };

    const handleChange = ({ target }) => {
        setTaskValue(target.value);
    };

    return (
        <div id='area-modal' onClick={ handleDisableModal }>
            <div id='modal'>
            <input
                type='text'
                id='input-modal'
                onChange={ handleChange }
                autoComplete='off'
                autoFocus={ true }
                maxLength='100'
                placeholder={ props.attributesModal.placeholder } 
                onKeyPress={ verifyKey }
                value={ taskValue ? taskValue : '' } />
                <div>
                    <button 
                        className='buttons-modal'
                        id='add-button-modal'
                        onClick={ validateInput }>
                        { 
                            props.attributesModal.type.add
                            ?
                            'Adicionar'
                            :
                            props.attributesModal.type.edit
                            ?
                            'Editar'
                            : null
                        }
                    </button>

                    <button
                        className='buttons-modal'
                        id='cancel-button-modal'
                        onClick={ handleDisableModal }>Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}
