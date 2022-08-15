import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//     { id: 'q1', author: 'Jatinder', text: 'Learning React is fun!' },
//     { id: 'q2', author: 'Jatinder Kaur', text: 'Learning React is great!' },
// ];

const AllQuotes = () => {
    const { sendRequest, data: loadedQuotes, status, error } = useHttp(getAllQuotes, true);

    // using useEffect to send request when this component loads.
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className="centered focused">{error}</p>
    }

    if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
        return <NoQuotesFound />
    }

    return (
        // <QuoteList quotes={DUMMY_QUOTES}></QuoteList>
        <QuoteList quotes={loadedQuotes}></QuoteList>
    );
};

export default AllQuotes;