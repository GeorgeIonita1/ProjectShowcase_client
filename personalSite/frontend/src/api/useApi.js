// todo: call setApiResponseStatus and handleTimerModalClose in a reusable function
import { useEffect, useState } from "react";

import { createType, deleteType, editType, visibilityType } from '../helpers';
import ApiServices from "../services/ApiServices";

export default function useApi(modalData, handleAutoModalClose) {
    const [projectsAPI, setProjectsAPI] = useState(null);
    const [apiResponseStatus, setApiResponseStatus] = useState(false);
    
    const handleOnSubmitForm = async values => {
        switch (modalData.requestType) {
            case createType: {
                const response = await ApiServices.createProject(values);
                
                if (response.ok) {
                    const responseJSON = await response.json();
                    setProjectsAPI([...projectsAPI, responseJSON]);
                    setApiResponseStatus(201);
                    handleTimerModalClose();
                } else setApiResponseStatus(404);
                break;
            }
            case editType: {
                const response = await ApiServices.editProject(values, modalData.data.id);
                
                if (response.ok) {
                    const responseJSON = await response.json();
                    const newList = projectsAPI.map(el => {
                        if (el.id === responseJSON.id) {
                            return { ...responseJSON }
                        } else {
                            return el
                        }
                    });
                    setProjectsAPI(newList);
                    setApiResponseStatus(201);
                    handleTimerModalClose();
                    
                } else setApiResponseStatus(404);
                break;
            }
            case visibilityType: {
                const response = await ApiServices.visibilityProjectChange(modalData.data.isVisible, modalData.data.id);
                
                if (response.ok) {
                    const responseJSON = await response.json();
                    const newList = projectsAPI.map(el => {
                        if (el.id === responseJSON.id) {
                            return { ...el, isVisible: !el.isVisible }
                        } else {
                            return el
                        }
                    })
                    setProjectsAPI(newList);
                    setApiResponseStatus(201);
                    handleTimerModalClose();
                }
                break;
            }
            case deleteType: {
                const response = await ApiServices.deleteProject(modalData.id);
                
                if (response.ok) {
                    const responseJSON = await response.json();
                    const newList = projectsAPI.filter(e => e.id !== responseJSON.id);
                    setProjectsAPI(newList);
                    setApiResponseStatus(201);
                    handleTimerModalClose();
                }
                break;
            }
        }
    }
    
    function handleTimerModalClose() {
        setTimeout(() => {
            handleAutoModalClose();
            setApiResponseStatus(false);
        }, 1000)
    }

    const handleModalStatusOff = () => {
        setApiResponseStatus(false);
    }

    useEffect(() => {
        (async () => {
            const response = await ApiServices.getProjects();

            if (response.ok) {
                const responseJSON = await response.json();
                setProjectsAPI(responseJSON);
            }
        })()
    }, [])

    return { projectsAPI, apiResponseStatus, handleOnSubmitForm, handleModalStatusOff }
}
