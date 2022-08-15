import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
// useRouteMatch is a kind of similar to useLocation but it has more information abt currently loaded route.
import { Route, Link, useRouteMatch } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//     { id: 'q1', author: 'Jatinder', text: 'Learning React is fun!' },
//     { id: 'q2', author: 'Jatinder Kaur', text: 'Learning React is great!' },
// ];

const QuoteDetail = () => {
    const { sendRequest, status, error, data: loadedQuote } = useHttp(getSingleQuote, true);
    const match = useRouteMatch();
    console.log(match);
    const params = useParams();
    const { quoteId } = params;

    // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

    // using useEffect to send request when this component loads.
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className="centered">{error}</p>
    }

    if (!loadedQuote.text) {
        return <p>No quote found!</p>
    }

    return (
        <section>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}></HighlightedQuote>
            {/* Or <Route path={`/quotes/${params.quoteId}`} exact> */}
            <Route path={match.path} exact>
                <div className='centered'>
                    {/* Or <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Load Comments</Link> */}
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            {/* OR <Route path='/quotes/:quoteId/comments'> */}
            {/* Or <Route path={`/quotes/${params.quoteId}/comments`}> */}
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </section>
    );
};

export default QuoteDetail;