export const projectsDummy = [
    {
        id: 'gdfi8jl58g',
        description: 'Numarul 1',
        imgURL: 'https://i.ytimg.com/vi/XelWZr_B7E4/maxresdefault.jpg',
        name: 'Nicolae Guta',
        redirrect: 'https://google.com'
    },
    {
        id: 'gdfi8jlfdfdf58g',
        description: 'E cel mai tare',
        imgURL: 'https://i.ytimg.com/vi/XelWZr_B7E4/maxresdefault.jpg',
        name: 'Adrian minunt',
        redirrect: 'https://google.com'
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
const imageUploadType = 'imageUpload';
// export const baseURL = import.meta.env.MODE === 'production' ? 'https://showcase-projects-cccc1f78f6bc.herokuapp.com/projects/' : 'http://localhost:3333/projects/';
export const baseURL = 'https://showcase-projects-cccc1f78f6bc.herokuapp.com/projects/';
export const imageUploadRequestTypeObject = { requestType: imageUploadType };
const createURLType = baseURL + 'create';
const visibilityURLType = baseURL + 'visibility/';
const imageUploadURLType = baseURL +'imageupload';
const deleteURLType = baseURL + 'delete/';
const POSTType = 'POST';
const PUTType = 'PUT';
const DELETEType = 'DELETE';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export function fetcher(modalData, event) {
    let body = {};
    let method, URL;

    if (modalData.requestType === createType || modalData.requestType === editType) {
        for (let item of event.target) {
            if (item.name && item.name !== 'isVisible') body[item.name] = item.value;
            if (item.name === 'isVisible') body.isVisible = item.checked;
        }
    }

    switch (modalData.requestType) {
        case createType: {
            method = POSTType;
            URL = createURLType;
            break;
        }
        case editType: {
            method = PUTType;
            URL = baseURL + modalData.data.id;
            break;
        }
        case deleteType: {
            method = DELETEType;
            URL = deleteURLType + modalData.id;
            break;
        }
        case visibilityType: {
            method = PUTType;
            URL = visibilityURLType + modalData.data.id;
            body = { visibility: modalData.data.isVisible }
            break;
        }
        case imageUploadType: {
            if (event?.target?.files[0]) {
                URL = imageUploadURLType;
                method = POSTType;
                const myFile = event.target.files[0];
                const formData = new FormData();
                formData.append('file', myFile);
                body = formData;
            }
            break;
        }
    }

    if (modalData.requestType === imageUploadType) {
        return fetch(URL, {
            method,
            body,
        })
    } else {
        return fetch(URL, {
            method,
            headers,
            body: JSON.stringify(body),
        })
    }
}
