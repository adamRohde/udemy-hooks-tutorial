import React, { useState } from "react";

const Accordion = ({ items }) => {
    //This is a piece of state created to keep track of the item we clicked on.
    const [activeIndex, setActiveIndex] = useState(null);

    //This function is called by the onClick.  It called the "setState" method which sets our activeIndex.
    //calling setActiveIndex will then cause the component to re-render itself.
    const onTitleClick = (index) => {
        setActiveIndex(index);
        console.log("Title clicked", index);
    };

    //this function establishes the conditionals necessary to determine what needs rendering.
    //We use a ternary statement to match what we clicked on with its index.  When this match is found
    //we  change the className to add active, which material ui recognizes. (I think its material ui)
    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? "active" : "";
        return (
            <React.Fragment key={item.title}>
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    });
    return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
