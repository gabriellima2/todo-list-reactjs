import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

import './Task.css'

export default function Task(props) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ complete, setComplete ] = useState(props.isComplete);
    const [ valueText, setValueText ] = useState('');
    const [ idTaskEdit, setIdTaskEdit ] = useState(0);
    const [ valueButtonComplete, setValueButtonComplete ] = useState(props.valueButton);

    console.log(props.valueButton)

    const handleCompletedTask = id => {
        props.allTasks.map( task => {
            if ( task.id === id ) {
                task.completed = !task.completed;
                props.setCompletedTask( task.completed );
                setValueButtonComplete( task.completed ? '✔' : '.' );
                setComplete(task.completed);
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
                    id={`isComplete-${ complete }`}
                    onClick={ () => handleCompletedTask(props.id) }>
                    { valueButtonComplete }
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
