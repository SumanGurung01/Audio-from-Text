// selectors
const text = document.querySelector("textarea");
const playbtn = document.getElementById("play");
const voiceList = document.querySelector("select");
const pausebtn = document.getElementById("pause");
const stopbtn = document.getElementById("stop");


function speak(content)
{
  // resume when it is speaking but currently paused in middle
  if(speechSynthesis.paused && speechSynthesis.speaking){
    return speechSynthesis.resume()
  }

  // for new text 
  let say = new SpeechSynthesisUtterance(content);
  
  // select voice from voicelist and change voice of say to voice
  for(let voice of speechSynthesis.getVoices())
  {
    if(voice.name=== voiceList.value)
    {
      say.voice = voice;
    }
  }

  // disable the text when speaking
  text.disabled = true;
  
  // speak the content
  speechSynthesis.speak(say);
}

// pause text when it is speaking
function pause(){
  if(speechSynthesis.speaking){
    speechSynthesis.pause()
  }
}

// function to stop speaking
function stop(){

  // enable textarea
  text.disabled = false;
  // if speaking is apused first resume then cancel
  speechSynthesis.resume()
  speechSynthesis.cancel()

}

voices();

function voices()
{
  //getVoices and display in the option 
  for(let voice of speechSynthesis.getVoices())
  {
    let option = `<option value="${voice.name}">${voice.name}</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

speechSynthesis.addEventListener("voiceschanged",voices);

// add all the events
playbtn.addEventListener("click",e=>{
  e.preventDefault();
  if(text.value!=="")
  {
    speak(text.value);
  }
});

pausebtn.addEventListener("click",()=>{
  pause();
});

stopbtn.addEventListener("click",()=>{
  stop();
});
