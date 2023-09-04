import styled from "styled-components";

const RightSide = () => {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>

        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#LinkedIn</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>

        <Recommendation>
          View all recommendations
          <img src="/images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img src="/images/jobs-ad.jpg" alt="" />
      </BannerCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
  margin-top: 16px;

  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;

    & > div {
      display: flex;
      flex-direction: column;
      cursor: pointer;

      button:hover {
        background-color: rgba(112, 181, 249, 0.15);
      }

      span {
        text-align: start;
      }
    }

    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  background-image: url("/images/hashtag.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  margin-right: 8px;
`;

const Recommendation = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);

  img {
    margin-left: 5px;
  }

  &:hover {
    color: #0a66c2;
    text-decoration: underline;
  }
`;

const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;

export default RightSide;