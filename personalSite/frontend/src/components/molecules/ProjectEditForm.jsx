// TODO: more efficient way to render image and imageURL:12/13
// delete unused images from storage (send form data)


import { useContext, useState } from "react";
import { useFormik } from "formik";

import styles from './projectEditForm.module.scss';
import { ModalDataContext, ModalDataDispatchContext } from "../../contexts/ModalDataContext";
import { deleteType, fetcher, imageUploadRequestTypeObject, visibilityType } from '../../helpers';

// eslint-disable-next-line react/prop-types
export default function ProjectEditForm({onSubmitForm}) {
    const modalData = useContext(ModalDataContext);
    const dispatch = useContext(ModalDataDispatchContext);
    const [imageUrl, setImageUrl] = useState(modalData?.data?.imgURL);
    const [loading, setIsLoading] = useState(false);

    const formik =  useFormik({
        initialValues: {
            name: modalData?.data?.name,
            isVisible: modalData?.data?.isVisible,
            description: modalData?.data?.description,
            redirrect: modalData?.data?.redirrect,
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    console.log(formik)

    const handleImageUpload = async e => {
        setIsLoading(true);
        const response = await fetcher(imageUploadRequestTypeObject, e);

        if (!response.ok) console.log(response) // check
        if (response.ok) {
            const responseJson = await response.json();

            dispatch({
                type: modalData.requestType,
                data: { ...modalData.data, imgURL: responseJson.url },
            })

            setImageUrl(responseJson.url);
            setIsLoading(false);
        }
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
        </form>
    )
}