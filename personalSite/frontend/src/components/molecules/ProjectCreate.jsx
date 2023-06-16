import React, { useContext, useState } from 'react';
import styles from './projectCreate.module.scss';
import { ModalDataContext } from '../../contexts/ModalDataContext';

const ProjectCreate = ({ onToggleModal }) => {
    const projectData = useContext(ModalDataContext);
    const [project, setProject] = useState(projectData);

    const handleChange = event => {
        setProject({
            ...project,
            [event.target.name]: event.target.value
        });
    }

    const cere = () => {
        fetch('http://localhost:8080/api/posts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: 'kyle'})
        }).then(r => r.json()).then(r => console.log(r))
    }

    console.log(projectData)

    const handleSubmit = event => {
        const canCLose = false;
        event.preventDefault();
        const projectRef = {};

        for (let item of event.target) {
            if (item.name) projectRef[item.name] = item.value;
        }

        if (projectData.requestType === 'edit') {
            console.log('facem editare pe baza de date cu id: '+ projectData.data.id)
        }

        if (projectData.requestType === 'create') {
            console.log('facem create in baza de date cu: ',projectRef)
            
            fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectRef)
            })
        }


        if (canCLose) onToggleModal();
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Name:
                <input
                    type='text'
                    name='name'
                    value={project?.data?.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </label>
            <br />
            <label>
                Description:
                <input
                    type='text'
                    name='description'
                    value={project?.data?.description}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </label>
            <br />
            <label>
                Project Link:
                <input
                    type='string'
                    name='redirrect'
                    value={project?.data?.redirrect}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </label>
            <label>
                Image URL:
                <input
                    type='string'
                    name='imgURL'
                    value={project?.data?.imgURL}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </label>
            <br />
            <button type='submit' className={styles.button}>Submit Project</button>
        </form>
    );
}

export default ProjectCreate;
