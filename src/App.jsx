import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Formulario } from "./components/Formulario";
import { Listado } from "./components/Listado";
import { Footer, FooterCopyright } from "flowbite-react"; //libreria tailwindcss

function App() {
  const url = "https://restapitaskexpress-production.up.railway.app/api/tasks";

  // STATES
  const [tasks, setTasks] = useState([]); // Lista de Tareas
  const [taskToEdit, setTaskToEdit] = useState(null); // Tarea seleccionada para editar

  // FUNCIONES

  // Obtener Tareas

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("Error al obtener tarea: ", error);
    }
  };

  // Agregar Tarea
  const addTask = async (task) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  // Eliminar Tarea

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.log("Error al eliminar la tarea: ", error);
    }
  };

  // Actualizar Tarea

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`${url}/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Tarea actualizada correctamente:", data.message);

        // Actualizar el estado local
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks); // Actualiza el estado local con las nuevas tareas
        setTaskToEdit(null); // Limpia la tarea en edición
      } else {
        const error = await response.json();
        console.error("Error al actualizar la tarea:", error.error);
      }
    } catch (error) {
      console.error("Error de red al actualizar tarea:", error);
    }
  };
  
  // Tarea completada

  const toggleTaskCompleted = async (id, completed) => {
    
    if(!id){
      console.log("Falta el ID")
    }

    try {
       // realizar llamada al backend para cambiar el estado "completed"
       const response = await fetch(`${url}/${id}/status`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed })
       })

       if(!response.ok){
        throw new Error(`Error al actualizar la tarea`)
       }

       const updatedTask = await response.json(); 
      console.log("Tarea actualizada:", updatedTask);
       // Actualizar el estado local de las tareas
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );

    } catch(error){
      console.log("Error al cambiar el estado como completado", error);
      alert("Hubo un error al cambiar el estado de la tarea. Por favor, intentelo de nuevo")
    }
  }


  // Effect para cargar las tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);





  return (
    <>
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto grid py-20 md:grid-cols-3 gap-6">
        
          {/* Formulario */}
          <Formulario
            addTask={addTask}
            updateTask={updateTask}
            taskToEdit= {taskToEdit}
            setTaskToEdit={setTaskToEdit}
          />
        
        {/* Listado */}
        <div className="p-5 space-y-10 col-span-2">
          <Listado
            tasks={tasks}
            deleteTask={deleteTask}
            setTaskToEdit={setTaskToEdit}
            toggleTaskCompleted={toggleTaskCompleted}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer container>
        <FooterCopyright
          href="#"
          by="Laura Castaño | Víctor Márquez"
          year={2025}
        />
      </Footer>
    </>
  );
}

export default App;
