import { 
    forwardRef, 
    useCallback,
    useContext, 
    useImperativeHandle,
    useState 
} from "react";

import './Modal.css';

function Modal(props, ref) {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ textValue, setTextValue ] = useState('');
    const [ idValue, setIdValue ] = useState(0);

    const { 
        allTasks,
        setAllTasks,
        taskId,
        setTaskId,
    } = useContext(props.context);
    const { add: isAdd, edit: isEdit } = props.attributesModal.type;

    const handleCancel = ({ target }) => {
        if ( target.id !== 'area-modal' && target.id !== 'cancel-button-modal' ) return;

        handleDesactiveModal();
    };

    // Ativa o modal com valores pre-definidos para editar a tarefa!
    const handleActiveModal = useCallback((text='', id=0) => {
        setTextValue(text);
        setIdValue(id);
        setIsVisible(true);
    }, []);

    const handleDesactiveModal = useCallback(() => {
        setIsVisible(false);
    });

    const verifyKey = ({ code }) => {
        if ( code !== 'Enter' ) return;

        validateInput();
    };

    const validateInput = () => {
        setTextValue( textValue.trim() );

        if ( textValue === '' ) return;

        if ( isAdd ) {
            addNewTask();
        } else if ( isEdit ) {
            editTask();
        };
    };

    const addNewTask =  () => {
        const newTask = {
            text: textValue,
            id: taskId,
            finished: false
        };
        setAllTasks([ ...allTasks, newTask ]);
        setTextValue('');
        setTaskId( state => state + 1 );

        handleDesactiveModal();
    };

    const editTask = () => {
        allTasks.map(task => {
            if ( task.id === idValue ) {
                task.text = textValue;
                setAllTasks( [... allTasks] );
            };
        });
        handleDesactiveModal();
    };

    const handleChange = ({ target }) => {
        setTextValue(target.value);
    };

    useImperativeHandle(ref, () => {
        return {
            handleActiveModal
        };
    });

    if ( !isVisible ) return null;

    return (
        <div id='area-modal' onClick={ handleCancel }>
            <div id='modal'>
                <input 
                    type='text'
                    id='input-modal'
                    autoComplete='off'
                    autoFocus={ true }
                    maxLength='100'
                    placeholder={ props.attributesModal.placeholder }
                    onChange={ handleChange }
                    onKeyPress={ verifyKey }
                    defaultValue={ textValue ? textValue : '' }
                />
                <div>
                    <button
                        className='buttons-modal'
                        id='add-button-modal'
                        onClick={ validateInput }>
                            {
                                isAdd ? 'Adicionar' : isEdit ? 'Editar' : null
                            }
                    </button>
                    <button
                        className='buttons-modal'
                        id='cancel-button-modal'
                        onClick={ handleCancel }>Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(Modal);