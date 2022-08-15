import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
    const { sendRequest, status } = useHttp(addQuote);
    const history = useHistory();

    // using useEffect to send request when this component loads.
    useEffect(() => {
        if (status === 'completed') {
            // here, we are using programmatic navigation.
            history.push('/quotes');
        }
    }, [status, history]);

    const addQuoteHandler = quoteData => {
        // console.log(quoteData);
        sendRequest(quoteData);
    };
    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
    );
};

export default NewQuote;