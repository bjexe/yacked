import React from 'react'
import Workout from './Workout'
import workoutSummaryData from '../workoutSummaryData'
import workoutData from '../exampleWorkoutData'
import Modal from 'react-modal'
import './Home.css'
import { v4 as uuidv4 } from 'uuid'

Modal.setAppElement('#root');

const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      overflowy: 'scroll',
      maxHeight: '80%'
    },
};

const buttonStyle = {
    height: '100px'
}

export default function Home() {
    // states
    const [showModal, setShowModal] = React.useState(false);
    const [showWorkoutModal, setShowWorkoutModal] = React.useState(false);
    const [showTemplatesModal, setShowTemplatesModal] = React.useState(false);
    const [templateFormData, setTemplateFormData] = React.useState({
        name: "",
        id: uuidv4(),
        exercises: [{
            id: uuidv4(),
            name: "",
            sets: [{
                id: uuidv4(),
                weight: 0,
                reps: 0
            }],
        }]
    });

    // functions for creating a workout template
    function openTemplateModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    function handleFormChange(event){
        const {name, value, type} = event.target;
        console.log(value)
        setTemplateFormData(oldForm => {
            let newForm = {...oldForm};
            //if (name === "templateName"){
                newForm.name = value;
                return newForm;
            //}
        });
    }

    function addExercise() {
        setTemplateFormData(oldForm => {
            let newForm = {...oldForm};
            newForm.exercises.push({
                id: uuidv4(),
                sets: [{
                    id: uuidv4(),
                    weight: 0,
                    reps: 0
                }]
            })
        })
    }

    // functions for viewing 'recent workouts', will be implemented when database is up and this app has access to it through an API
    function openWorkoutModal() {
        setShowWorkoutModal(true);
    }

    function closeWorkoutModal () {
        setShowWorkoutModal(false);
    }

    //functions for starting workouts
    function openWorkoutTemplateModal() {
        setShowTemplatesModal(true);
    }

    function closeWorkoutTemplateModal() {
        setShowTemplatesModal(false);
    }

    // renders that are volatile

    const formInputs = templateFormData.exercises.map((exercise) => { // need: a form for each exercise to add a certain amount of sets with default values
        return(
            <>
                <input type="text" name="exercise" id={exercise.id} />
                <button>Add a set</button>
            </>
        );
    })

    const recentWorkouts = workoutSummaryData.map((workout) => {
        return (
            <>
                <hr />

                <div onClick={openWorkoutModal}>
                    <p style={{fontsize: "100px"}}>{workout.title}</p>
                    <p>{workout.exercises} Exercises</p>
                </div>

                <Modal
                    isOpen={showWorkoutModal}
                    onRequestClose={closeWorkoutModal}
                    style={modalStyles}
                    contentLabel = "show recent workouts"
                >
                    <Workout workoutData={workoutData} active={false}/>
                </Modal>
            </>
        );
    });

    return (
        <div className='home'>

            <nav className='home-nav'>
                Yacked!
                <img src='../images/logo-small.jpg' alt='logo-small' style={{width: "100px"}}/>
            </nav>

            <div className='content'>
                <div className='menu'>

                    <button onClick={openTemplateModal} name="create-template" style={buttonStyle}>
                        Create a workout template
                    </button>

                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        style={modalStyles}
                        contentLabel = "create a new template"
                    >
                        <form>
                            <input name="templateName" placeholder="Name of template" value = {templateFormData.name} onChange={handleFormChange}/>
                            <button type="button" onClick={addExercise}>Add an exercise</button>
                        </form>
                    </Modal>

                    <button onClick={openWorkoutTemplateModal} name="startTemplate" style={buttonStyle}>
                        Start workout from template
                    </button>

                    {/* Later, include the exercises present in these templates */}
                    <Modal
                        isOpen={showTemplatesModal}
                        onRequestClose={closeWorkoutTemplateModal}
                        style={modalStyles}
                        contentLabel = "create a new template"
                    >
                        <h2>Select a template to begin</h2>
                        <button>Push</button>
                        <button>Pull</button>
                        <button>Leg</button>
                    </Modal>

                    <button style = {buttonStyle} onClick={openWorkoutModal} name="startEmpty">
                        Start empty workout
                    </button>

                </div>

                <div className='recent-workouts'>
                    <h1>Recent Workouts</h1>
                    {recentWorkouts}
                </div>

            </div>
        </div>
    );
}