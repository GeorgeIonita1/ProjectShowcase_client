// Switch colors
export const onColor = '#0d0673';
export const offColor = '#712727';

// types
export const viewType = 'view';
export const createType = 'create';
export const editType = 'edit';
export const visibilityType = 'visibility';
export const deleteType = 'delete';
export const baseURL = 'https://showcase-projects-cccc1f78f6bc.herokuapp.com/projects/';
const imageUploadType = 'imageUpload';
export const imageUploadRequestTypeObject = { requestType: imageUploadType };
export const createURLType = baseURL + 'create';
export const visibilityURLType = baseURL + 'visibility/';
export const imageUploadURLType = baseURL + 'imageupload';
export const deleteURLType = baseURL + 'delete/';
export const POSTType = 'POST';
export const PUTType = 'PUT';
export const DELETEType = 'DELETE';

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}
