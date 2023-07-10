import { POSTType, createURLType, headers, baseURL, imageUploadURLType, PUTType, visibilityURLType, deleteURLType, DELETEType } from "../helpers";

class ApiServices {
    getProjects() {
        return fetch(baseURL);
    }

    uploadImage(event) {
        if (event?.target?.files[0]) {
            const myFile = event.target.files[0];
            const formData = new FormData();
            formData.append('file', myFile);

            return fetch(imageUploadURLType, {
                method: POSTType,
                body: formData,
            })
        }
    }

    createProject(values) {
        return fetch(createURLType, {
            method: POSTType,
            headers,
            body: JSON.stringify(values)
        })
    }
    
    editProject(values, id) {
        return fetch(baseURL + id, {
            method: PUTType,
            headers,
            body: JSON.stringify(values)
        })
    }
    
    visibilityProjectChange(visibility, id) {
        return fetch(visibilityURLType + id, {
            method: PUTType,
            body: { visibility }
        })
    }
    
    deleteProject(id) {
        return fetch(deleteURLType + id, {
            method: DELETEType,
        })
    }
}

export default new ApiServices;