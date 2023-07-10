import { useEffect, useState } from "react";

import { createType, deleteType, editType, fetcher, baseURL, visibilityType } from '../helpers';

export default function useApi(modalData, handleAutoModalClose) {
    const [projectsAPI, setProjectsAPI] = useState(null);
    const [apiResponseStatus, setApiResponseStatus] = useState(false);
    
    const handleOnSubmitForm = async values => {
        
        const response = await fetcher(modalData, values);
        if (!response.ok) setApiResponseStatus(404);

        if (response.ok) {
            const responseJSON = await response.json();

            switch (modalData.requestType) {
                case createType: {
                    setProjectsAPI([...projectsAPI, responseJSON]);
                    break;
                }
                case editType: {
                    const newList = projectsAPI.map(el => {
                        if (el.id === responseJSON.id) {
                            return { ...responseJSON }
                        } else {
                            return el
                        }
                    });
                    setProjectsAPI(newList);
                    break;
                }
                case deleteType: {
                    const newList = projectsAPI.filter(e => e.id !== responseJSON.id);
                    setProjectsAPI(newList);
                    break;
                }
                case visibilityType: {
                    const newList = projectsAPI.map(el => {
                        if (el.id === responseJSON.id) {
                            return { ...el, isVisible: !el.isVisible }
                        } else {
                            return el
                        }
                    })
                    setProjectsAPI(newList);
                    break;
                }
            }
            setApiResponseStatus(201);
            handleTimerModalClose();
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
        fetch(baseURL)
            .then(response => response.json())
            .then(response => setProjectsAPI(response))
            .catch(err => console.log(err))
    }, [])

    return { projectsAPI, apiResponseStatus, handleOnSubmitForm, handleModalStatusOff }
}