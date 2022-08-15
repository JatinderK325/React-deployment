import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);

  // URLSearchParams is a built in constructor function in the browser. It gives an object(queryParams) where we can then extract 'query parameters' by key.
  // location is an object which has property named 'search'.
  const queryParams = new URLSearchParams(location.search);

  // And that search property has a query parameter inside of it with key = 'sort'. hence we are extracting the query parameter.
  // here if sort === 'asc' means isSortingAscending = true.
  const isSortingAscending = queryParams.get('sort') === 'asc';

  // getting sortedQuotes by calling sortQuotes() and passing arguments (i)'quotes' that we got through props and (ii) order means asc or desc, means true/false.
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // To update the query parameters in the url.
    // Or history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc')); // new path has been added.
    /* or history.push({
      pathname: location.pathname,
      search: `sort=${(isSortingAscending ? 'desc' : 'asc')}`,
    }); */
    history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
