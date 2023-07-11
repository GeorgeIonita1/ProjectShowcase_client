import styles from './aboutMe.module.scss';
import portraitImg from '../../assets/portrait.jpg';

export default function AboutMe() {
    return (
        <section id='about-me' className={styles.aboutMe}>
            <div className="container">
                <div className={styles.aboutMeContent}>
                    <small>About me</small>
                    <h3>Lets do something fun together</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Incidunt quasi eos accusamus nostrum! Non assumenda adipisci quae, culpa 
                    numquam tenetur consequuntur ex itaque magni a nobis, sunt ratione distinctio 
                    voluptate!</p>
                </div>
                <div className={styles.aboutMeImage}>
                    <img src={portraitImg} alt="" />
                </div>
            </div>
        </section>
    );
}