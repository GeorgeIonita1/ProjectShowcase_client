export const projectsDummy = [
    {
        id: 'gdfi8jl58g',
        description: 'Numarul 1',
        imgURL: 'https://i.ytimg.com/vi/XelWZr_B7E4/maxresdefault.jpg',
        name: 'Nicolae Guta',
        redirrect: 'https://google.com',
        isVisible: true,
    },
    {
        id: 'gdfi8jlfdfdf58g',
        description: 'E cel mai tare',
        imgURL: 'https://i.ytimg.com/vi/XelWZr_B7E4/maxresdefault.jpg',
        name: 'Adrian minunt',
        redirrect: 'https://google.com',
        isVisible: false,
    }
];

// Switch colors
export const onColor = '#0d0673';
export const offColor = '#712727';

// types
export const viewType = 'view';
export const createType = 'create';
export const editType = 'edit';
export const visibilityType = 'visibility';
export const deleteType = 'delete';
export const baseURL = import.meta.env.MODE === 'production' ? 'https://showcase-projects-cccc1f78f6bc.herokuapp.com/projects/' : 'http://localhost:3333/projects/';
const imageUploadType = 'imageUpload';
export const imageUploadRequestTypeObject = { requestType: imageUploadType };
export const createURLType = baseURL + 'create';
export const visibilityURLType = baseURL + 'visibility/';
export const imageUploadURLType = baseURL +'imageupload';
export const deleteURLType = baseURL + 'delete/';
export const POSTType = 'POST';
export const PUTType = 'PUT';
export const DELETEType = 'DELETE';

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}
