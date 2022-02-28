import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

import './Task.css'

export default function Task(props) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isFinished, setIsFinished ] = useState(props.isDone);
    const [ valueText, setValueText ] = useState('');
    const [ idTaskEdit, setIdTaskEdit ] = useState(0);
    const [ valueButtonFinished, setValueButtonFinished ] = useState(props.valueButton);

    const handleFinishedTask = id => {
        props.allTasks.map( task => {
            if ( task.id === id ) {
                task.finished = !task.finished;

                // Para ativar o useEffect e alterar o objeto no localStorage!
                props.setControlLocalStorage( !props.controlLocalStorage );

                setValueButtonFinished( task.finished ? '✔' : '.' );
                setIsFinished( task.finished );
            };
        });
    };

    const edit = id => {
        props.allTasks.map( task => {
            if ( task.id === id ) {
                setValueText( task.text );
                setIdTaskEdit( id );
            };
        });

        setIsEditing(true);
    };

    const del = id => {
        props.setAllTasks(props.allTasks.filter( task => {
            return task.id !== id;
        }));
    };

    return (
        <>
            {
                isEditing ? <Modal 
                
                // Defini atributos ao modal mas, para edição da tarefa!
                attributesModal={{
                    type: {
                        add: false,
                        edit: true
                    },
                    text: valueText,
                    placeholder: 'Editando tarefa',
                    hideModal: setIsEditing,
                    idTaskEdit
                }} allTasks={[ ...props.allTasks ]} setAllTasks={ props.setAllTasks } /> 
                : null
            }
            <div id='task-item'>
                <button
                    id={`isFinished-${ isFinished }`}
                    onClick={ () => handleFinishedTask(props.id) }>
                    { valueButtonFinished }
                </button>
                <textarea
                    id='task-item-text'
                    readOnly={ true }
                    value={ props.value }>
                </textarea>
                <div id='task-item-buttons-area'>
                    <button 
                        className='task-item-btn'
                        id='btn-edit'
                        onClick={ () => edit(props.id) }>
                        Editar
                    </button>
                    <button
                        className='task-item-btn'
                        id='btn-delete'
                        onClick={ () => del(props.id) }>
                        Deletar
                    </button>
                </div>
            </div>       
        </>
    )
}
