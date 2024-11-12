//Import necessary functionalities
import React from 'react';
import MainLayout from '../layout/MainLayout';
import kitten from '../assets/sleeping_kitten.jpg'
import cats from '../assets/cats_together.png';
import dogs from '../assets/dogs_costume.png';
import fetch from '../assets/fetch.png';
import park from '../assets/dog_park.png';

const HomePage = () => {

    return (
        <MainLayout>
            <div className="general">
                <h1>Training Made Easier - Click, Treat, and Track!</h1>
                <p className="general-description">Click and Treat is a free training tracker to help you structure and document your pet's training sessions. We know pet training can be hard. We're here to help you celebrate progress, one click and treat at a time!</p>

                <div className="homepage">
                    <div className="row">
                        <div className="homepage-column">
                            <h3>NO BREED RESTRICTIONS HERE!</h3>
                            <p>While we may not recommend training your neighborhood raccoon, we know that pet training is for more than just dogs. Add any of your pets to track their individual progress.</p>
                        </div>

                        <img className="homepage-picture" src={park} alt='A tan pitbull mix is laying on grass and looking up at the camera with an open mouth conveying happiness'/>
                    </div>
                    
                    <div className="row">
                        <img className="homepage-picture" src={dogs} alt='Three dogs are sitting next to each other on concrete. They are dressed as a lion, pirate, and rock star.'/>
                        
                        <div className="homepage-column">
                            <h3>TAKE IT STEP BY STEP</h3>
                            <p>Our training plans break down skills into manageable stages to help set you and your pet up for success! Choose from our library of training plans or create your own (coming soon).</p>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="homepage-column">
                            <h3>REDUCE YOUR MENTAL LOAD</h3>
                            <p>Keeping track of feeding and walking schedules is enough. No need to also try to remember your pet's personal record on a certain trick or the treat that's gotten the most wags. Jot down all of your notes for each session and they'll be waiting for you next time.</p>
                        </div>
    
                        <img className="homepage-picture" src={kitten} alt='A white and gray tabby is sleeping with a sliver of his tongue sticking out.'/>
                    </div>

                    <div className="row">
                        <img className="homepage-picture" src={fetch} alt='A tan pitbull mix is running towards the camera on concrete with a bright orange ball in her mouth.'/>
    
                        <div className="homepage-column">
                            <h3>ALL ABOUT THE JOURNEY</h3>
                            <p>Celebrate your pet's progress, growth, and sometimes roller coaster of a training journey by viewing your sessions at a glance. While you can access each session's details individually, sometimes it's the big picture that can really show us how far we've come.</p>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="homepage-column">
                            <h3>COMING SOON: CONNECT WITH YOUR SUPPORT NETWORK</h3>
                            <p>Have you ever cued a pet to do something only for your partner to say they taught them the same skill with a different name? We know pets often have multiple humans in their lives that are invested in their training. Soon, you'll be able to connect your account with a friend or family member to access all of your pet's training data, not just your own.</p>
                        </div>
                        
                        <img className="homepage-picture" src={cats} alt='Two tabby cats are sitting next to each other with a button in between them. They are looking up at the camera.'/>
                    </div>
                    
                </div>
                
            </div>

        </MainLayout>
        
    )
}

export default HomePage;