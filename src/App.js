import React from "react";
import { useState, useEffect } from "react";
import { faHouse, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnsiText } from "react-ansi-animation";
import me_img from "./me.png";
import ansi4 from "./ansi/ob-mario.ans";
import Typist from "react-typist-component";

function Button({ title, onClick }) {
  const [hover, setHover] = useState(false);
  const underline = hover ? "underline decoration-4" : "";
  return (
    <a
      href="#"
      className={`font-medium p-2 m-2 text-amber-400 ${underline} rounded-md`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {title}
    </a>
  );
}

const RepeatingCharacter = ({ character = "#" }) => {
  const [repeatedText, setRepeatedText] = useState("");

  useEffect(() => {
    const updateRepeatedText = () => {
      const containerWidth = window.innerWidth; // Use the body's width or the container's
      console.log(containerWidth);
      const testCanvas = document.createElement("canvas");
      const context = testCanvas.getContext("2d");
      context.font = "16px TopazPlus-a1200"; // Match the font of your text
      const charWidth = context.measureText(character).width;
      console.log(charWidth);
      const repeatCount = Math.ceil(containerWidth / charWidth) - 3;
      setRepeatedText(character.repeat(repeatCount));
    };

    updateRepeatedText();
    window.addEventListener("resize", updateRepeatedText);

    return () => {
      window.removeEventListener("resize", updateRepeatedText);
    };
  }, [character]);

  return (
    <div className="text-amber-600 whitespace-pre overflow-hidden">
      {repeatedText}
    </div>
  );
};

function Caret() {
  return (
    <div className="caret animate-blink inline-block w-2 h-5 bg-amber-300 "></div>
  );
}

function Prompt() {
  return (
    <span className="text-amber-500">
      root@192.168.1.2 <FontAwesomeIcon className="mb-0.5" icon={faCoffee} />{" "}
      {`>`}{" "}
    </span>
  );
}

function About() {
  const [doneCmd, setDoneCmd] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="text-amber-300">
      <Prompt />
      <span className="text-amber-300">
        <Typist
          typingDelay={100}
          cursor={<Caret />}
          hideCursorWhenDone={true}
          onTypingDone={() => setDoneCmd(true)}
        >
          /bib/
          <Typist.Delay ms={1000} />
          <Typist.Backspace count={2} />
          <Typist.Delay ms={1000} />
          n/about.sh
        </Typist>
      </span>
      <br />
      {doneCmd && (
        <Typist
          typingDelay={50}
          cursor={<Caret />}
          hideCursorWhenDone={true}
          onTypingDone={() => setDone(true)}
        >
          <Typist.Delay ms={1000} />
          <Typist.Paste>Loading</Typist.Paste>
          <Typist.Delay ms={700} />
          .
          <Typist.Delay ms={700} />
          .
          <Typist.Delay ms={700} />
          .
          <Typist.Delay ms={700} />
          <Typist.Backspace count={12} />
          <Typist.Paste>
            <div className="p-2">
              <img src={me_img} className="w-[200px]" />
            </div>
          </Typist.Paste>
          Hi! I'm Damian Borowiec. I'm a researcher at{" "}
          <a href="https://nplan.io">nPlan Ltd.</a>
          <br />
        </Typist>
      )}
      {done && (
        <span>
          <br />
          <Prompt />
          <Caret />
        </span>
      )}
    </div>
  );
}

function CV({}) {
  const [doneCmd, setDoneCmd] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="text-amber-300">
      <Prompt />
      <span>
        <Typist
          typingDelay={100}
          cursor={<Caret />}
          hideCursorWhenDone={true}
          onTypingDone={() => setDoneCmd(true)}
        >
          cat /opt/cvs/db_cv_final_final_1_1_final_9_done.txt
        </Typist>
      </span>
      <br />

      {doneCmd && (
        <Typist
          typingDelay={50}
          cursor={<Caret />}
          hideCursorWhenDone={true}
          onTypingDone={() => setDone(true)}
        >
          <Typist.Delay ms={1000} />
          <Typist.Paste>This is a CV</Typist.Paste>
          <br />
        </Typist>
      )}
      {done && (
        <span>
          <br />
          <Prompt />
          <Caret />
        </span>
      )}
    </div>
  );
}

function AnsiViewer() {
  return (
    <div>
      <AnsiText src={ansi4} maxHeight={1200} />
    </div>
  );
}

function Contact() {
  return (
    <div className="text-amber-300">
      <p>
        Contact me at{" "}
        <a href="mailto:dborowiec10@gmail.com">dborowiec10@gmail.com</a>
      </p>
    </div>
  );
}

function App() {
  const [section, setSection] = useState("about");

  const sections = {
    about: <About />,
    cv: <CV />,
    // research: <About />,
    ansi: <AnsiViewer />,
    contact: <Contact />,
  };

  return (
    <div>
      <div className="scanlines"></div>
      <div className="scanline"></div>
      <div className="flicker"></div>
      <div className="body p-2 m-auto">
        <RepeatingCharacter character="-" />
        <Button title={"About"} onClick={() => setSection("about")} />
        <Button title={"CV"} onClick={() => setSection("cv")} />
        {/* <Button title={"Research"} onClick={() => setSection("research")}/> */}
        <Button title={"ANSI ART"} onClick={() => setSection("ansi")} />
        <Button title={"Contact"} onClick={() => setSection("contact")} />
        <RepeatingCharacter character="-" />
        {section && sections[section]}
      </div>
    </div>
  );
}

export default App;
