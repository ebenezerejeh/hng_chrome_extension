import mainIcon from "./image_assets/iCON 7 1.svg"
import settingsIcon from "./image_assets/setting-2.svg"
import closeIcon from "./image_assets/close-circle.svg"
import fullScreenIcon from "./image_assets/monitor.svg"
import currentTabIcon from "./image_assets/copy.svg"
import videoCameraIcon from "./image_assets/video-camera.svg"
import toggleIcon from "./image_assets/Button.svg"
import microphoneIcon from "./image_assets/microphone.svg"
import { useState } from 'react'
import './App.css'

function App() {
   

    const onClick= async () => {
        let [tab] = await chrome.tabs.query({ active: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },



            func: async () => {

                function createVideoElement() {
                    var htmlString = `
                                        <div id="myDiv">
                                            
                                        </div>
                                        `;

                                        // Inject the HTML string into the DOM
                                        document.body.innerHTML += htmlString;



                    var video = document.createElement("video");
                  
                    video.controls = true; // Enable video controls (play, pause, volume, etc.)
                    video.width = 640; // Set the width of the video (adjust as needed)
                    video.height = 460; // Set the height of the video (adjust as needed)
                  
                    // Append the video element to the container
                    var container = document.getElementById("myDiv");
                    container.appendChild(video);
                  }
                  
                  createVideoElement();
                
                    const stream = await navigator.mediaDevices.getDisplayMedia(
                        {
                            video:{
                                mediaSource: "screen",
                            }
                        }
                    );
                    const data = [];
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable=(e)=>{
                        data.push(e.data)
                    };
                    mediaRecorder.start();
                    mediaRecorder.onstop=(e)=>{
                      document.querySelector("video").src=URL.createObjectURL(
                            new Blob(data, {
                                type: data[0].type,
                            })
                            )                    };

                    

            }
        });
    }

  return (
    <>
    <div className="mainOptions_Container">
        <div className="mainOptions_header">
            <div className="mainOptions_header_title_container">
                <img src={mainIcon} alt="mainIcon"/>
                <span>HearMeOut</span>
                <img src={settingsIcon} alt="settingsIcon"/>
                <img src={closeIcon} alt="closeIcon"/>

            </div>
            <div className="mainOptions_header_body_container">
                <p>This extension helps you record and share help videos with ease.</p>

            </div>

        </div>
        <div className="mainOptions_section">
            <div className="mainOptions_section1">
                <div className="mainOptions_section1_fullScreen">
                    <img src={fullScreenIcon} alt="fullScreenIcon"/>
                    <p>Full Screen</p>
                </div>
                <div className="mainOptions_section1_currentTab">
                    <img src={currentTabIcon} alt="currentTabIcon"/>
                    <p>Current Tab</p>
                </div>
            </div>
            <div className="mainOptions_section2">
                <div className="mainOptions_section2_image">
                    <img src={videoCameraIcon} alt="videoCameraIcon"/>
                    <span className="mainOption_text">Camera</span>
                </div>
                <div className="toogle">
                    <img src={toggleIcon} alt="toggleIcon"/>
                </div>

            </div>
            <div className="mainOptions_section3">
                <div className="mainOptions_section2_image">
                    <img src={microphoneIcon} alt="microphoneIcon"/>
                    <span className="mainOption_text">Audio</span>
                </div>
                <div className="toogle">
                    <img src={toggleIcon} alt="toggleIcon"/>
                </div>
                
                
            </div>
            <div className="mainOptions_section4" onClick={onClick}><span>Start Recording</span></div>

        </div>

    </div>
      
    </>
  )
}

export default App
