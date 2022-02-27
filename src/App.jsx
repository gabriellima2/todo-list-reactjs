import React, { useCallback, useEffect, useState } from 'react';
import Modal from './components/Modal';
import Task from './components/Task';

import './App.css';

function App() {
  const [ modalIsVisible, setModalIsVisible ] = useState(false);
  const [ allTasks, setAllTasks ] = useState(
    localStorage.getItem('tasks') 
    ? 
    JSON.parse(localStorage.getItem('tasks')) 
    : 
    []
  );
  const [ completedTask, setCompletedTask ] = useState(false);
  const [ totalTasks, setTotalTasks ] = useState(allTasks.length);
  const [ introdutionText, setIntrodutionText ] = useState('');
  const [ taskID, setTaskID ] = useState(
    localStorage.getItem('id') 
    ? 
    Number(localStorage.getItem('id')) 
    : 
    // Se tiver tarefa retorna o id da ultima somando 1, senao retorna 0!
    () => totalTasks >= 1 ? allTasks[ totalTasks - 1 ].id + 1 : 0
  );

  useEffect(() => {
    localStorage.setItem('id', taskID);
  }, [ taskID ])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify([ ...allTasks ]));
  }, [ allTasks, completedTask ]);

  useEffect(() => {
    setTotalTasks(allTasks.length);
  }, [ allTasks ]);

  useEffect(() => {
      if ( totalTasks === 0 ) {
        setIntrodutionText('Nenhuma tarefa!');
      } else if( totalTasks === 1 ) {
        setIntrodutionText(`Total de ${totalTasks} tarefa!`);
      } else {
        setIntrodutionText(`Total de ${totalTasks} tarefas!`);
      };
  }, [ totalTasks ]);

  return (
    <>
      <div className='initial-area'>
        <div className='none-task-area'>
          <p id='none-task'>{ introdutionText }</p>
          { 
            totalTasks === 0 
            ? 
            <span>
              Para começar adicione alguma tarefa que você precisa realizar!
            </span>
            : 
            null 
          }
        </div>
        
        <button
          id='new-task-btn'
          onClick={ () => setModalIsVisible(!modalIsVisible) }>
          Nova Tarefa
        </button>

        {
          modalIsVisible
          ? 
          <Modal
            allTasks={ [...allTasks] }
            setAllTasks={ setAllTasks }
            taskID={ taskID }
            setTaskID={ setTaskID }

          // Para passar propriedade definindo os atributos do modal para adição de tarefas!
            attributesModal={{
              type: {
                add: true,
                edit: false
              },
              text: '',
              placeholder: 'Digite a tarefa',
              hideModal: setModalIsVisible,
            }}
          /> 
          : 
            null
        }
      </div>

      <ul>
        { allTasks.map( task => (
          console.log(task),
          <Task 
            value={ task.text } 
            id={ task.id }
            isComplete={ task.completed }
            allTasks={ [...allTasks] } 
            setAllTasks={ setAllTasks }
            valueButton={ task.completed ? '✔' : '.' }
            setCompletedTask={ setCompletedTask }
            key={ task.id } 
          />
        ))}
      </ul>
    </>
  )
}

export default App
