import React from 'react';
import {gql} from "apollo-boost";
import {Query, Subscription} from "react-apollo";

const helloQuery = gql`
    {
        hello
    }
`;

const booksQuery = gql`
    {
        books{
            id
            title
        }
    }
`;

const booksAddedSub = gql`
    subscription BookAdded {
        bookAdded {
            id
            title
        }
    }
`;

function App() {
    console.log("hihi");
  return (
    <div>
      hello apollo graphQL backend
      <Query query={helloQuery}>
        {
          ({loading, error, data}) => <p>{loading ? "Loading...." : data.hello}</p>
        }
      </Query>
      <Query
        query={booksQuery}
        // pollInterval={500}
      >
        {
          ({loading, error, data, refetch}) => {
              return loading ? "onLoad" : data.books.map(({id, title}) => {
                  return <p>{title}</p>
              })
          }
        }
      </Query>
      <Subscription
        subscription={booksAddedSub}>
        {
          (props) => {
            console.log("props: ", props);
            // { data : { bookAdded }}
              const { data } = props;

              if(data){
                  return <p style={{ backgroundColor: "wheat"}}> {data.bookAdded.title} </p>
              } else {
                  return <p>hello</p>
              }
          }
        }
      </Subscription>
    </div>
  );
}

export default App;
