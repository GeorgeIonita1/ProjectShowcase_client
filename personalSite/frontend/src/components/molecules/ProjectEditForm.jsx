// TODO: more efficient way to render image and imageURL
// todo: handle image upload error
// delete unused images from storage (send form data)


import { useContext, useState } from "react";
import { useFormik } from "formik";

import styles from './projectEditForm.module.scss';
import { ModalDataContext, ModalDataDispatchContext } from "../../contexts/ModalDataContext";
import { deleteType, visibilityType } from '../../helpers';
import ApiServices from "../../services/ApiServices";

const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

// eslint-disable-next-line react/prop-types
export default function ProjectEditForm({ onSubmitForm }) {
    const modalData = useContext(ModalDataContext);
    const dispatch = useContext(ModalDataDispatchContext);
    const [imageUrl, setImageUrl] = useState(modalData?.data?.imgURL);
    const [loading, setIsLoading] = useState(false);

    const [originalSize, setOriginalSize] = useState('');
    const [compressedSize, setCompressedSize] = useState('');

    const formik = useFormik({
        initialValues: {
            name: modalData?.data?.name,
            isVisible: modalData?.data?.isVisible,
            description: modalData?.data?.description,
            redirrect: modalData?.data?.redirrect,
        },
        onSubmit: values => {
            onSubmitForm({ ...values, imgURL: imageUrl })
        }
    })

    const handleImageUpload = event => {
        setIsLoading(true);

        if (event?.target?.files[0]) {
            const file = event.target.files[0];
            const blobURL = URL.createObjectURL(file);

            const img = new Image();
            img.src = blobURL;

            img.addEventListener('load', () => {
                const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
                const canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                canvas.toBlob(async blob => {
                    setOriginalSize(readableBytes(file.size));
                    setCompressedSize(readableBytes(blob.size));

                    const response = await ApiServices.uploadImage(blob);

                    if (response.ok) {
                        const responseJson = await response.json();

                        dispatch({
                            type: modalData.requestType,
                            data: { ...modalData.data, imgURL: responseJson.url },
                        })

                        setImageUrl(responseJson.url);
                        setIsLoading(false);
                    }
                })
            })
        }
    }

    function calculateSize(img, maxWidth, maxHeight) {
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
            }
        }
        return [width, height];
    }

    function readableBytes(bytes) {
        const i = Math.floor(Math.log(bytes) / Math.log(1024)),
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    }

    return (modalData.requestType === deleteType || modalData.requestType === visibilityType) ? (
        <div className={styles.formPrompt}>
            <h4>are you sure?</h4>
            <button type='button' onClick={onSubmitForm}>yes</button>
        </div>
    ) : (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className='input-container'>
                <span>Title</span>
                <input
                    type='text'
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    required
                />
            </div>
            <label>
                Is Visible
                <input
                    type='checkbox'
                    name='isVisible'
                    value={formik.values.isVisible}
                    onChange={formik.handleChange}
                />
            </label>
            <div className='input-container'>
                <span>Description</span>
                <input
                    type='textarea'
                    name='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    required
                />
            </div>
            <fieldset>
                {loading && <h3 className={styles.formLoading}>Loading . . .</h3>}
                <span>Image URL</span>
                <div className='input-container'>
                    <input
                        type='string'
                        name='imgURL'
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <h3>or</h3>
                <div className={styles.formImage}>
                    <input
                        type='file'
                        name="imgUpload"
                        onChange={handleImageUpload}
                    />
                    <div>
                        <img src={modalData?.data?.imgURL} />
                    </div>
                </div>
            </fieldset>
            <div className='input-container'>
                <span>Project URL</span>
                <input
                    type='string'
                    name='redirrect'
                    value={formik.values.redirrect}
                    onChange={formik.handleChange}
                    required
                />
            </div>
            <br />
            <button type='submit'>Submit</button>
            <h1>{originalSize} {compressedSize}</h1>
        </form>
    )
}