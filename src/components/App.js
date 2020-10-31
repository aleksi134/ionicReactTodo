import { IonButton, IonItem, IonLabel, IonInput, IonList } from '@ionic/react';
import React, { useEffect, useState } from "react";

function App() {

  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || [])
  const [newTaskItem, updateNewTaskItem] = useState('')

  let addNewTaskToList = function(taskItem) {
    let taskListCopy = [...taskList]
    let taskItemObj = { "id": Math.floor(Date.now() / 1000), "taskContent": taskItem }
    taskListCopy.push(taskItemObj)
    setTaskList(taskListCopy)
    updateNewTaskItem("")
    localStorage.setItem("taskList", JSON.stringify(taskListCopy))
  }

  let deleteTask = function(taskId) {
    let taskListCopy = [...taskList]
    let shortenedTaskList = taskListCopy.filter(taskListItem => taskListItem.id !== taskId)
    setTaskList(shortenedTaskList)
  }

  return (

    <div className="App">

      <IonItem>
        <IonLabel position="floating">Floating Label</IonLabel>
        <IonInput value={newTaskItem} onIonChange={ (e) => updateNewTaskItem(e.target.value) }></IonInput>
      </IonItem>

      <IonButton expand="block" onClick={() => addNewTaskToList(newTaskItem) }>Lisää taski</IonButton>

      <IonList>
        { taskList.map( (singleTask) => 
          <IonItem>
            <IonLabel key={singleTask.id}>{singleTask.taskContent} <button onClick={() => deleteTask(singleTask.id)}>x</button></IonLabel>
          </IonItem> ) 
        }
      </IonList>
      
    </div>
  );

}

export default App;
