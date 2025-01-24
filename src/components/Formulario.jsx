
import { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export const Formulario = ({addTask, updateTask, taskToEdit, setTaskToEdit }) => {
  
  const[task, setTask] = useState({ title:"", description: ""});

  // Rellenar el formulario si se selecciona una tarea para editar
  useEffect(() => {
    if(taskToEdit){
      setTask(taskToEdit)
    } else {
      // si no hay tarea, el formulario se limpia
      setTask({title: "", description: ""});
    }
  }, [taskToEdit])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(taskToEdit){
      updateTask(task) // llama a la función updateTask en App.jsx
    } else {
      addTask(task) // Añade una nueva tarea
    }
    setTask({title: "", description: ""}); // Limpiar formulario después de enviar
    setTaskToEdit(null); // Resetea el estado de edición
  }

    return (
   <>
      {/* Formulario */}
      <div className="border border-solid border-indigo-200 p-12 rounded-lg space-y-10 bg-indigo-200 w-96">
        <h2 className="text-3xl text-gray-600">{taskToEdit ? "Actualizar Tarea" : "Nueva Tarea"}</h2>
        <div className="space-y-3 mt-10">
          <form onSubmit={handleSubmit}
          className="flex flex-col gap-6">
            {/* Input Título */}
            <div>
              <div className="mb-2 block text-gray-600">
                <Label htmlFor="input-info" color="gray" value="Título" />
              </div>
              <TextInput
                className="w-full"
                id="input-info"
                type="text"
                value={task.title}
                placeholder="Título"
                onChange={(e) => setTask({ ...task, title: e.target.value})}
                required
                color="info"
              />
            </div>

            {/* Input Descripción */}
            <div>
              <div className="mb-2 block text-gray-600">
                <Label htmlFor="comment" color="gray" value="Descripción" />
              </div>
              <Textarea
                className="w-full"
                id="comment"
                value={task.description}
                placeholder="  Descripción de tu tarea"
                onChange={(e) => setTask({...task, description: e.target.value})}
                color="info"
                required
                rows={4}
              />
            </div>

            {/* Botón Crear Tarea */}
            <div className="flex flex-row flex-wrap" >
            <Button color="blue" type="submit" className="font-medium text-white m-2">
              {taskToEdit ? "Actualizar" : "Crear Tarea"} 
            </Button>
            {taskToEdit && (
              <Button className="font-medium text-white bg-red-900 hover:dark:bg-red-800 m-2" type="button" 
              onClick={() => {
                setTask({ title: "", description: "" }); // Limpia el formulario
                setTaskToEdit(null); // Cancela la edición
              }}
              >
                Cancelar
              </Button>
            )}
            
            </div>
          </form>
        </div>
      </div>
      </>
    
  );
};
