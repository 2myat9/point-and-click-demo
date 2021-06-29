import React, { useState } from "react";
import Card from "./Components/Card";
import { Link } from "react-router-dom";

interface PageType {
  imgUrl: string;
  cardTitle: string;
  cardBody: string;
}

// enum
const PAGES: { [key: string]: PageType } = {
  PAGE1: {
    imgUrl:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1325&q=80",
    cardTitle: "Tip # 1",
    cardBody:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam eveniet amet fuga ipsam inventore, ab minima nemo! Pariatur molestias eos quisquam voluptatum sit. Earum voluptatibus consectetur minima aspernatur quod consequatur!",
  },
  PAGE2: {
    imgUrl:
      "https://images.unsplash.com/photo-1511497584788-876760111969?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
    cardTitle: "Tip # 2",
    cardBody:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quae voluptatem ea sint temporibus eligendi, expedita sed ipsam consequuntur aliquid.",
  },
  PAGE3: {
    imgUrl:
      "https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    cardTitle: "Tip # 3",
    cardBody:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolore architecto dolorem odio rem, earum deleniti. Fugit unde laudantium iusto rerum, fuga sapiente necessitatibus culpa?",
  },
};

const PAGE_NUMS = Object.keys(PAGES);

const Help = () => {
  const [activePage, setActivePage] = useState(0);

  const handlePageUp = () => {
    // handles edge case
    if (activePage + 1 >= PAGE_NUMS.length) {
      return;
    } else {
      setActivePage((prevState) => prevState + 1);
    }
  };

  const handlePageDown = () => {
    if (activePage - 1 < 0) {
      return;
    } else {
      setActivePage((prevState) => prevState - 1);
    }
  };

  // console.log(activePage);

  return (
    <>
      <div className="p-4 pb-0">
        <Link to="/">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
          >
            Back
          </button>
        </Link>
      </div>
      <Card
        activePage={activePage}
        onClickNext={handlePageUp}
        onClickPrev={handlePageDown}
        imgUrl={PAGES[PAGE_NUMS[activePage]].imgUrl}
        cardTitle={PAGES[PAGE_NUMS[activePage]].cardTitle}
        cardBody={PAGES[PAGE_NUMS[activePage]].cardBody}
      />
    </>
  );
};

export default Help;
