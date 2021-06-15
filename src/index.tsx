import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ladyBugImg from "./images/ladybug.png";
import beeImg from "./images/bee.png";
import miteImg from "./images/mite.png";
import slugImg from "./images/slug.png";
import backgroundImg from "./images/background.png";

const TARGET_CORRECT_GUESSES: number = 2;

interface ModalProps {
  showModal: boolean;
  hasWon: boolean;
  isFriendly: boolean;
  onClick: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  let modalContent, modalHeader;
  if (props.hasWon) {
    modalHeader = "Congratulations!";
    modalContent = "You have won the game.";
  } else if (props.isFriendly) {
    modalHeader = "Oops!";
    modalContent = "That's a good bug.";
  } else {
    modalHeader = "Correct!";
    modalContent = "That's a bad bug.";
  }

  if (props.showModal) {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{modalHeader}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={props.onClick}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  {modalContent}
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={props.onClick}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  } else {
    return null;
  }
};

interface BugItemProps {
  className: string;
  imgSrc: string;
  bugName?: string;
  onClick?: () => void;
}

const BugItem: React.FC<BugItemProps> = (props) => {
  return (
    <span>
      <img
        className={props.className}
        src={props.imgSrc}
        alt={props.bugName}
        onClick={props.onClick}
      />
    </span>
  );
};

interface Bug {
  imgSrc: string;
  isFriendly: boolean;
}

// Array<string>
// string[]

// object
// {}

// known as enums
const BUGS: { [key: string]: Bug } = {
  LADY_BUG: {
    imgSrc: ladyBugImg,
    isFriendly: true,
  },
  BEE: {
    imgSrc: beeImg,
    isFriendly: true,
  },
  MITE: {
    imgSrc: miteImg,
    isFriendly: false,
  },
  SLUG: {
    imgSrc: slugImg,
    isFriendly: false,
  },
};

interface GameProps {}

const Game: React.FC<GameProps> = (props) => {
  // define states using state hook
  // typescript implicitly knows the type of each state from initial value
  const [showModal, setShowModal] = useState(false);
  const [currentBugId, setCurrentBugId] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [correctBugs, setCorrectBugs] = useState(new Set());

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  /**
   * Set the bugId state value to the id of the latest clicked bug
   *
   * @param bugId - id of the bug that was clicked
   */
  const handleBug = (bugId: string) => {
    toggleModal();

    setCurrentBugId(bugId);

    if (BUGS[bugId]) {
      if (!BUGS[bugId].isFriendly) {
        if (!hasWon) {
          if (!correctBugs.has(bugId)) {
            // does not have bugId yet
            if (correctBugs.add(bugId).size === TARGET_CORRECT_GUESSES) {
              // check for win
              setHasWon(true);
              setCorrectBugs(new Set());
            } else {
              // if next step not win, just add to list
              setHasWon(false);
              setCorrectBugs((prevState) => {
                return new Set([...prevState, bugId]);
              });
            }
          } else {
            // already has bugId
            // do nothing
          }
        } else {
          // reset if u click bad bug after winning game
          setHasWon(false);
          setCorrectBugs((prevState) => {
            return new Set([...prevState, bugId]);
          });
        }
      } else {
        // if bug is not friendly
        if (hasWon) {
          // reset if u click good bug after winning game
          setHasWon(false);
          setCorrectBugs(new Set());
        } else {
          // this triggers when correctBugs set is either empty or not-yet-full
          // two possibilities
          // resets all progress if u click on a good bug
          setHasWon(false);
          setCorrectBugs(new Set());

          // or keep the current progress (keep the set)
          //   setHasWon(false);
        }
      }
    } else {
      throw new Error("Whoops! The given BugId does not exist in BUGS object.");
    }
  };

  // create list of components to render
  const bugItems = Object.keys(BUGS).map((bugId) => (
    <BugItem
      className="m-2"
      imgSrc={BUGS[bugId].imgSrc}
      bugName={bugId}
      onClick={() => handleBug(bugId)}
    />
  ));

  // render
  return (
    <>
      <Modal
        showModal={showModal}
        isFriendly={currentBugId ? BUGS[currentBugId].isFriendly : false}
        hasWon={hasWon}
        onClick={() => toggleModal()}
      />

      <div className="absolute top-96 flex flex-row gap-x-16 z-10">
        {bugItems}
      </div>

      <img
        className="w-screen h-screen z-0"
        src={backgroundImg}
        alt="background"
      />
    </>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
