import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api/api";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/images/ui.png";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
import { NormalTextPrimaryShared } from "../../components/common/texts/NormalText";
import { SmallTextShared } from "../../components/common/texts/SmallText";
const Course = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  console.log(id);
  useEffect(() => {
    api
      .get(`courses/${id}`)
      .then((res) => {
        // console.log(res.data);
        setVideos(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(videos);
  return (
    <StyledVideos>
      {videos.map((video, index) => (
        <Card key={index}>
          {/* <Card.Img variant="top" src={img} /> */}
          <CardImage>
            <span>{index + 1}</span>
          </CardImage>
          <Card.Body className="d-flex flex-column justify-content-between">
            <Card.Title>
              <NormalTextPrimaryShared>{video.title}</NormalTextPrimaryShared>
            </Card.Title>
            <Card.Text>
              <SmallTextShared>
                {`${video.description}`.length > 100
                  ? video.description.slice(0, 100) + "..."
                  : video.description}
              </SmallTextShared>
            </Card.Text>
            <div className="d-flex justify-content-end">
              <Link to={`${video.id}`}>
                <ShowBtn
                  style={{
                    width: "fit-content",
                  }}
                >
                  Watch Video
                </ShowBtn>
              </Link>
            </div>
          </Card.Body>
        </Card>
      ))}
    </StyledVideos>
  );
};
const StyledVideos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const CardImage = styled.div`
  height: 200px;
  background-image: url(${img});
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  span {
    position: absolute;
    width: 200px;
    height: 50px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--normal-text);
    color: var(--primary-shared);
    font-weight: bold;
    rotate: -45deg;
    top: 00%;
    left: 0%;
    transform: translate(-29%, -69%);
  }
`;
const ShowBtn = styled(Button)`
  background-color: var(--primary-shared);
  border-color: var(--primary-shared);
  font-size: var(--small-text);
  border-width: 2px;
  &:hover {
    background-color: white;
    color: var(--primary-shared);
    border-color: var(--primary-shared);
  }
`;
export default Course;
