import { createContext,
  useCallback,
  useEffect,
  useRef,
  useState 
} from "react";

import Modal from "./components/Modal";
import Task from "./components/Task";

import './App.css';

const LOCAL_STORAGE_TASKS_KEY = 'tasks';
const LOCAL_STORAGE_ID_KEY = 'id';

const Context = createContext();

function findTasks() {
  const valueLocalStorage = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);

  if ( !valueLocalStorage ) return [];

  return JSON.parse(valueLocalStorage);
};

function findId(allTasks, totalTasks) {
  const idLocalStorage = localStorage.getItem(LOCAL_STORAGE_ID_KEY);

  if ( idLocalStorage ) return Number(idLocalStorage);

  if ( totalTasks === 0 ) return 0;

  const lastTask = allTasks[totalTasks - 1];
  if ( totalTasks > 0 ) return lastTask.id + 1;
};

export default function App() {
  const refModalAdd = useRef(null);
  const [ introdutionText, setIntrodutionText ] = useState('');
  const [ controlLocalStorage, setControlLocalStorage ] = useState(false);

  const [ allTasks, setAllTasks ] = useState( findTasks() );
  const [ totalTasks, setTotalTasks ] = useState(allTasks.length);
  const [ taskId, setTaskId ] = useState( findId(allTasks, totalTasks) );
  
  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_ID_KEY, taskId);
  }, [ taskId ]);

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(allTasks));
  }, [ allTasks, controlLocalStorage ]);

  useEffect(() => {
      setTotalTasks(allTasks.length);

      if ( totalTasks === 0 ) return setIntrodutionText('Nenhuma tarefa!');

      if ( totalTasks === 1 ) {
          return setIntrodutionText(`Total de ${totalTasks} tarefa!`);
      } else if ( totalTasks > 1 ) {
          return setIntrodutionText(`Total de ${totalTasks} tarefas!`);
      };
      
  }, [ allTasks, totalTasks ]);

  const openModal = useCallback(() => {
      refModalAdd.current ?.handleActiveModal();
  });

  return (
      <>
          <div className='initial-area'>
              <div className='none-task-area'>
                  <p id='none-task'>{ introdutionText }</p>
                  {
                      totalTasks === 0 ? 
                      <span>
                          Para começar adicione alguma tarefa que 
                          você precisa realizar!
                      </span> 
                      : null
                  }
              </div>
              <button 
                  id='new-task-btn'
                  onClick={ openModal }
              >
                  Nova Tarefa
              </button>
          </div>
          <Context.Provider value={{
              allTasks,
              setAllTasks,
              taskId,
              setTaskId
          }}>
              <Modal 
                  attributesModal={{
                      type: {
                          add: true,
                          edit: false
                      },
                      text: '',
                      placeholder: 'Digite a tarefa'
                  }}
                  context={ Context }
                  ref={ refModalAdd }
              />

              <ul className='tasks-area'>
                  {
                      allTasks.map( task => (
                          <Task key={ task.id }
                              values={{
                                  text: task.text,
                                  id: task.id,
                                  isDone: task.finished
                              }}
                              context={ Context }
                              buttonText={ task.finished ? '✔' : '.' }
                              controlLocalStorage={ controlLocalStorage }
                              setControlLocalStorage={ setControlLocalStorage }
                          />
                      ))
                  }
              </ul>
          </Context.Provider>
      </>
  );
};

