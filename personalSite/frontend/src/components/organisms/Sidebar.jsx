import { useContext } from 'react';

import './sidebar.scss';
import SidebarProjectCard from './SidebarProjectCard';
import { ModalDataDispatchContext } from '../../contexts/ModalDataContext';
import { createType } from '../../helpers';
import closeIcon from '../../assets/icons/close.svg';
import arrowLeftkIcon from '../../assets/icons/arrow-left.svg';

export default function Sidebar({projectsAPI, editMode, sidebarIsOpen, onSidebarIsOpen, onEditMode, onToggleModal, onSidebarReset, onSubmitForm}) {
    const dispatch = useContext(ModalDataDispatchContext);

    const handleCreateProject = () => {
        dispatch({
          type: createType,
        });
        
        onToggleModal();
    }

    return (
        <div className='sidebar'>
            <div className={`sidebarOverlay ${sidebarIsOpen ? 'active' : ''}`}></div>
            <aside className={`${!sidebarIsOpen ? 'open' : ''}`}>
                {editMode && <div className='sidebar-close return' onClick={onEditMode}><img src={arrowLeftkIcon} /></div>}
                <div className='sidebar-close close' onClick={onSidebarReset}>
                    <img src={closeIcon} />
                </div>
                <div className='sidebarContent'>
                    <ul>
                        <li onClick={onSidebarIsOpen}>
                            <a href="#home">Home</a>
                        </li>
                        <li onClick={onSidebarIsOpen}>
                            <a href="#about-me">About me</a>
                        </li>
                        <li onClick={onSidebarIsOpen}>
                            <a href="#portofolio">Portofolio</a>
                        </li>
                        <li onClick={onEditMode}>
                            <a>Edit Works</a>
                        </li>
                    </ul>
                    <div className={`sidebarProjects ${editMode && 'open'}`}>
                        <div className="wrapper">
                            <p className='add-project' onClick={handleCreateProject}>+</p>
                            {projectsAPI && projectsAPI.map(e => <SidebarProjectCard key={e.id} card={e} onToggleModal={onToggleModal} onSubmitForm={onSubmitForm} />)}
                        </div>

                    </div>
                </div>
            </aside>
        </div>
    );
}