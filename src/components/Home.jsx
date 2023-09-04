import styled from "styled-components";
import LeftSide from "./Leftside";
import Main from "./Main";
import RightSide from "./Rightside";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';


const Home = (props) => {
  return (
    <div>
      <Container>
        {!props.user && <Navigate to="/" />}
        <Layout>
          <LeftSide />
          <Main />
          <RightSide />
        </Layout>
      </Container>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    // Add more specific PropTypes for other user properties if necessary
  }),
};


const Container = styled.div`
  padding-top: 40px;
  max-width: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

// const Content = styled.div`
//   max-width: 1128px;
//   margin-left: auto;
//   margin-right: auto;
// `;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 50px;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    margin: 25px 0;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Home);