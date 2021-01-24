import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
    //State that determines the keyword we will be searching
    const [term, setTerm] = useState(" ");
    // const ref = useRef();

    //results state will hold the results obtained from wiki search
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    //This use effect will execute anytime term changes
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    //Use effect is a function that will be called anytime the [term] is rendered and on initial render of Search();
    useEffect(() => {
        console.log("Initial render or term was changed");
        //First Way
        const search = async () => {
            const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "query",
                    list: "search",
                    origin: "*",
                    format: "json",
                    srsearch: debouncedTerm,
                },
            });
            setResults(data.query.search);
        };
        if (debouncedTerm) {
            search();
        }
    }, [debouncedTerm]);

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    {/* the function below opens us up to cross site scripting... */}
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input value={term} onChange={(e) => setTerm(e.target.value)} className="input" />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    );
};

export default Search;
