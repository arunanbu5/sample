import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useQuery} from '@apollo/client';
import { useEffect, useState } from "react";
import styled from '@emotion/styled';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


const client = new ApolloClient({
  uri: 'http://localhost:9002/graphql',
  cache: new InMemoryCache(),
});
            

export const GET_USERS = gql`
query allCompanies {
  employee {
      id
  firstName
  lastName
  address
  }
}
`;
function DisplayUser() {
  const [userData, setUserData] = useState()
  const [count, setCount] = useState(12);

  const StyledList = styled.li`
  border: 1px solid grey;
  background-color: #D3D3D3;
  list-style: none;
  width: 30%;
  height: 12rem;
  margin: 1rem;
  overflow: scroll;
  padding: 1rem;
`;

const Container = styled.div`
text-align: center;
`;

const Stlyedbutton= styled.button`
margin: auto;
width: 20rem;
display: grid;
padding: 2rem;
`;

const Stlyedbuttoncontainer = styled.div`
padding: 2rem;
`;
  useEffect(() => {
    const fetchData = async () => {
     fetch(`https://dummyjson.com/users?limit=${count}&select=firstName,lastName,address,email,phone`)
      .then(async (response) => {
        const userDetail = await response.json();
        setUserData(userDetail)
        })        
    }
    fetchData()
  }, [count])
  return (
    <>
   <Container>
       <h2>User Details</h2>
    <ul className="row">
      {userData?.users.map(users => <StyledList key={users.firstName} className="col-md-4 col-sm-6">

        <h5>{users.firstName} {users.lastName}</h5>
        <h5>{users.email}</h5>
        <h5>{users.phone}</h5>
        <h5>{users.address.address}</h5>
      </StyledList>
      )}
    </ul><Stlyedbuttoncontainer><Stlyedbutton onClick={()=> setCount(count + 12)}>Load More</Stlyedbutton></Stlyedbuttoncontainer></Container></>
  )

}



export const RandomUser = () => {

  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div key={data.employee.id}>
      <h3>{data.employee.firstName}</h3>
      <h3>{data.employee.lastName}</h3>
      <h3>{data.employee.address}</h3>
    </div>
  )
}



const Index = () => {
  return (
    <>
    <ApolloProvider client={client}>
    <RandomUser/>
    <DisplayUser/>
      </ApolloProvider>
    </>
  )
}
export default Index;

