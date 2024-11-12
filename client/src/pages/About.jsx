//Import necessary functionalities
import React from 'react';
import MainLayout from '../layout/MainLayout';
import daisy from '../assets/derpy_daisy.png';
import tati from '../assets/tati.png';
import cats from '../assets/hugging_cats.png';

const About = () => {

    return (
        <MainLayout>
            <div className="about">
                <h1>Why Click and Treat?</h1>
                <p>Click and Treat began as a final project for <a href="https://techtonica.org/full-time-program/" target="_blank" rel="noreferrer noopener">Techtonica</a>'s full-time coding program. Click and Treat's founder, <a href="https://www.linkedin.com/in/tati-guzman" target="_blank" rel="noreferrer noopener">Tati Guzman</a>, wanted to build a tool that she herself could use in her every day life.</p>
           
                <img className="about-pictures" src={cats} alt='Two tabby kittens are asleep in a cat tree. They are hugging side by side.'/>
                <img className="about-pictures" src={tati} alt='A young Latina woman is sitting on a gray bean bag with a tan pitbull on her lap. She is smiling toward the camera while the dog looks at the camera with a closed mouth.'/>
                <img className="about-pictures" src={daisy} alt='A tan pitbull is close to the camera with her tongue slightly out. Behind her, the sky is bright blue with no clouds. '/>
           
                <h1>Okay, but what am I clicking?</h1>
                <p>At Click and Treat, we are huge proponents of <a href="https://www.petmd.com/dog/behavior/how-to-train-a-dog-with-positive-reinforcement" target="_blank" rel="noreferrer noopener">positive reinforcement training</a>. Training does not ever require fear or punishment. Instead, our pets should be rewarded for the behaviors we want to see and given the structure and patience to meet the goals we set out for them. Markers help communicate exactly what was done to earn the treat/reinforcement, which helps our pets repeat that behavior! You can use a verbal prompt, <a href="https://www.chewy.com/sungrow-clickers-wrist-band-dog-cat/dp/241963?utm_source=google-product&utm_medium=cpc&utm_campaign=20027453190&utm_content=&gad_source=1&gclid=Cj0KCQjw1Yy5BhD-ARIsAI0RbXanQDkH7sRLq4VmjeO7Rnly8DvafmwGsIVuhFdIOUJD91sjPmrJwAcaArLHEALw_wcB" target="_blank" rel="noreferrer noopener">clicker</a>, or even just a clicky pen. When you see the behavior you are cueing, simply click and treat!</p>
           

                {/* Future Sections should include: blurb about Tati, some fun facts about Techtonica, and pictures of Daisy, Luke, and Han! */}
            </div>
        </MainLayout>
    )
}

export default About;