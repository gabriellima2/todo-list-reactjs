import { useState, useContext, useCallback, useRef } from "react";
import Modal from "./Modal";

import './Task.css'

export default function Task(props) {
    const refModalEdit = useRef(null);
    const [ isFinished, setIsFinished ] = useState(props.values.isDone);

    const [ 
        finishedButtonText ,
        setfinishedButtonText 
    ] = useState(props.buttonText);

    const {
        allTasks,
        setAllTasks,
        ...rest
    } = useContext(props.context);

    const openModal = useCallback((text, id) => {
        refModalEdit.current ?.handleActiveModal(text, id);
    });


    const handleFinishedTask = id => {
        allTasks.map( task => {
            if ( task.id === id ) {
                task.finished = !task.finished;

                // Para ativar o useEffect e alterar o objeto no localStorage!
                props.setControlLocalStorage( !props.controlLocalStorage );

                setfinishedButtonText( task.finished ? '✔' : '.' );
                setIsFinished( task.finished );
            };
        });
    };

    const edit = id => {
        allTasks.map( task => {
            if ( task.id === id  ) {
                openModal(task.text, task.id);
            }; 
        });
    };

    const del = id => {
        setAllTasks( allTasks.filter( task => task.id !== id ));
    };

    return (
        <>
            <Modal 
                attributesModal={{
                    type: {
                        add: false,
                        edit: true
                    },
                    placeholder: 'Editando tarefa',
                }}
                context={ props.context }
                ref={ refModalEdit }
            />

            <div id='task-item'>
                <button 
                    id={`isFinished-${ isFinished }`}
                    onClick={ () => handleFinishedTask(props.values.id) }
                    >
                    { finishedButtonText }
                </button>
                <textarea
                    id='task-item-text'
                    readOnly={ true }
                    value={ props.values.text }
                ></textarea>

                <div id='task-item-buttons-area'>
                    <button
                        className='task-item-btn'
                        id='btn-edit'
                        onClick={ () => edit(props.values.id) }
                    >Editar
                    </button>
                    <button
                        className='task-item-btn'
                        id='btn-delete'
                        onClick={ () => del(props.values.id) }
                    >Deletar
                    </button>
                </div>
            </div>
        </>
    );
};