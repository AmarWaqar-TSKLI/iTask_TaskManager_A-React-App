import { useState, useEffect } from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { MdInput } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState(''); // for getting data from the input anf storing it in Todos array
  const [todos, setTodos] = useState([]); // for storing all the todos
  const [finished, setfinished] = useState(true);

  let togglefinished = ()=>{
    setfinished(!finished);
  }

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetoLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  let handleChange = (e) => {
    setTodo(e.target.value);
  }

  let handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !(newtodos[index].isCompleted);
    setTodos(newtodos);
    savetoLocalStorage();
  }


  let handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('');
    savetoLocalStorage();
  }

  let handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);

    let newtodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newtodos);
    savetoLocalStorage();
  }


  let handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newtodos);
    savetoLocalStorage();
  }

  return (
    <>
      <Navbar />
      <div className="container w-[90%]  md:w-[50%] min-h-[80vh] mt-14 rounded-lg bg-gray-300 mx-auto shadow-black shadow-lg">
        <h2 className=' w-[100%] text-center font-semibold font-mono mb-6 pt-4'>Your Todo's - Manage all ur Workload</h2>
        <div className="Addtask flex gap-2 justify-center">
          <input onChange={handleChange} value={todo} type="text" name="Todo" id="MyTodo" placeholder='Enter Task Here' className='py-1 px-2 rounded-sm w-1/2 font-mono font-semibold' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 rounded-lg px-4 text-xl font-semibold text-white hover:bg-violet-950'><MdInput /></button>
        </div >
        <div className="finished flex gap-2 w-[100%] justify-center mt-4">
          <input onChange={togglefinished} type="checkbox" checked={finished} name="" id="" className='text-center' />
          <p className='font-mono font-semibold'>See Finished Tasks</p>
        </div>
        <div className="breakpoint w-[100%] h-1 bg-violet-950 mt-12"></div>
        <h2 className='w-[100%] text-center font-semibold font-mono mb-6 pt-4'>Your Todo's are listed here </h2>
        <div className="Todos flex flex-col overflow-y-scroll h-[40vh]">

          {todos.length === 0 && <div className=' text-center mt-40 text-3xl text-violet-900 font-mono font-bold'>No Works to be Shown</div>}
          {todos.map(item => {

            return (finished||!item.isCompleted) && < div key={item.id} className="Todo flex flex-col w-[100%] items-center gap-5 mb-6">
              <div className='break h-[1px] w-[80%] bg-violet-950 mx-auto'></div>
              <p className={item.isCompleted ? "line-through text-white font-semibold font-mono w-[70%] text-center" : " text-white font-semibold font-mono w-[70%] text-center text-lg"}>{item.todo} </p>
              <div className="EditandDelete flex gap-2">
                <input className='rounded-full' type="checkbox" checked={item.isCompleted} value={item.isCompleted} name={item.id} onChange={handleCheckbox} />
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 rounded-lg py-1 px-4 text-sm font-semibold text-white hover:bg-violet-950'><RiEdit2Fill /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 rounded-lg py-1 px-4 text-sm font-semibold text-white hover:bg-violet-950'><MdDelete /></button>
              </div>
              <div className='break h-[1px] w-[80%] bg-violet-950'></div>
            </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App
