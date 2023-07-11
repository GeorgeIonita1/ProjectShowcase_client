// TODO: more efficient way to render image and imageURL
// todo: handle image upload error
// delete unused images from storage (send form data)


import { useContext, useState } from "react";
import { useFormik } from "formik";

import styles from './projectEditForm.module.scss';
import { ModalDataContext, ModalDataDispatchContext } from "../../contexts/ModalDataContext";
import { deleteType, visibilityType } from '../../helpers';
import ApiServices from "../../services/ApiServices";
import imageUploadIcon from '../../assets/icons/uploadImageIcon.svg';

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
            onSubmitForm({ ...values, imgURL: imageUrl })
        }
    })

    const handleImageUpload = async event => {
        setIsLoading(true);
        const response = await ApiServices.uploadImage(event);

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
            <label>
                Title
                <input
                    type='text'
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    required
                    />
            </label>
            <label>
                Description
                <input
                    type='textarea'
                    name='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    required
                    />
            </label>
            <label>
                Project URL
                <input
                    type='string'
                    name='redirrect'
                    value={formik.values.redirrect}
                    onChange={formik.handleChange}
                    required
                    />
            </label>
            <fieldset>
                {loading && <h3 className={styles.formLoading}>Loading . . .</h3>}
                <label>
                    Image URL:
                    <input
                        type='string'
                        name='imgURL'
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <h3>or</h3>
                <div className={styles.formImage}>
                    <input
                        id="imgUpload"
                        type='file'
                        name="imgUpload"
                        onChange={handleImageUpload}
                        hidden
                    />
                    <label htmlFor="imgUpload">
                        <img src={imageUploadIcon} />
                        Upload a file
                    </label>
                    <div>
                        {modalData?.data?.imgURL && <img src={modalData?.data?.imgURL} />}
                    </div>
                </div>
            </fieldset>
            <label className={styles.formCheckbox}>
                Is Visible:
                <input
                    type='checkbox'
                    name='isVisible'
                    value={formik.values.isVisible}
                    onChange={formik.handleChange}
                    />
            </label>
            <button type='submit'>Submit</button>
        </form>
    )
}