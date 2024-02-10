import { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { postArticleAPI } from "../actions";
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const [url, setUrl] = useState("");
  const [alertData, setAlertData] = useState({ error: null, message: null });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = new FormData();
        data.append("file", shareImage);
        data.append("upload_preset", "Career-Sync");
        data.append("cloud_name", "dxeiqmcai");

        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dxeiqmcai/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const cloudinaryData = await cloudinaryResponse.json();
        setUrl(cloudinaryData.url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        // Handle error appropriately, perhaps set an error state
      }
    };

    if (shareImage) {
      fetchData();
    }
  }, [shareImage]);

  useEffect(() => {
    const createPost = async () => {
      try {
        const response = await fetch("http://localhost:5000/createPost", {
          method: "post",
          headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            body: editorText,
            photo: url,
          }),
        });
        const data = await response.json();

        if (data.error) {
          setAlertData({ error: data.error, message: null });
        } else {
          navigate('/home');
          setAlertData({ error: null, message: data.message });
          console.log(data);
        }

        handleClick(); // Trigger Snackbar when data is received
      } catch (error) {
        console.error('Error creating post:', error);
        // Handle error appropriately, perhaps set an error state
      }
    };

    if (url) {
      createPost();
    }
  }, [url, editorText, navigate]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }

    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <img
                src="/images/close-icon.svg"
                alt=""
                onClick={(event) => reset(event)}
              />
            </Header>
            <SharedContent>
              <UserInfo>
                {/* User information rendering */}
              </UserInfo>

              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" && (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="" />
                    )}
                  </UploadImage>
                )}
                {assetArea === "media" && (
                  <>
                    <input
                      type="text"
                      placeholder="Please input a video link"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                    {videoLink && (
                      <ReactPlayer width={"100%"} url={videoLink} />
                    )}
                  </>
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <img
                  src="/images/share-image.svg"
                  alt=""
                  onClick={() => switchAssetArea("image")}
                />
                <img
                  src="/images/share-video.svg"
                  alt=""
                  onClick={() => switchAssetArea("media")}
                />
              </AttachAssets>
              <ShareComment>
                <img src="/images/share-comment.svg" alt="" />
                Anyone
              </ShareComment>
              <PostButton onClick={handleClick}>Post</PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertData.error ? 'error' : 'success'}>
          {alertData.error || alertData.message}
        </Alert>
      </Snackbar>
    </>
  );
};

PostModal.propTypes = {
  showModal: PropTypes.string.isRequired,
  user: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  postArticle: PropTypes.func.isRequired,
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 12px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-weight: 400;
  }

  svg,
  img {
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
  }

  img:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  background: transparent;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  border-right: 1px solid rgba(0, 0, 0, 0.15);

  img {
    padding: 5px;
    border-radius: 50%;
    margin-right: 3px;
    cursor: pointer;
  }

  img:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const ShareComment = styled.div`
  margin-left: 15px;
  margin-right: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px 0 5px;
  border-radius: 15px;

  img {
    padding: 5px;
    border-radius: 50%;
    margin-right: 3px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border: none;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.14)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(1, 1, 1, 0.2)" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182"};
  }
`;

const Editor = styled.div`
  padding: 12px 36px 12px 24px;

  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    border: none;
    outline: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
    border: none;
    outline: none;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    text-align: center;
  }
`;

const UploadImage = styled.div`
  text-align: center;

  img {
    width: 100%;
  }

  p {
    label {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      color: black;
    }
  }
`;

export default PostModal;
