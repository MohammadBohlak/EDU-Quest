import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api/api";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/images/ui.png";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
import { NormalTextPrimaryShared } from "../../components/common/texts/NormalText";
import { SmallTextShared } from "../../components/common/texts/SmallText";
import EditModalForm from "../../components/coursesPageComponents/editVideoModal/EditVideoModal";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmModal from "../../components/ui/modals/confirmModal/ConfirmModal";
const Course = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [videoToEditId, setVideoToEditId] = useState("");
  const [videoToDeleteId, setVideoToDeleteId] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [refreshVideos, setRefreshVideos] = useState(true);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const refreshVideosList = () => {
    setRefreshVideos((prev) => !prev);
  };
  console.log(id);
  useEffect(() => {
    api
      .get(`courses/${id}`)
      .then((res) => {
        console.log(res.data.videos);
        const videos = res.data.videos;
        const sorted = [...videos].sort(
          (a, b) => a.video_order - b.video_order
        );
        setVideos(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshVideos]);
  console.log(videos);

  const handleOk = () => {
    console.log("ok", videoToDeleteId);
    api
      .delete(`videos/${videoToDeleteId}`)
      .then((res) => {
        console.log(res.data);
        setIsModalDeleteOpen(false);
        refreshVideosList();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StyledVideos>
      {videos.map((video, index) => (
        <Card style={{ background: "var(--muted-shared)" }} key={index}>
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
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <CustomBtn
                  onClick={() => {
                    setVideoToEditId(video.id);
                    setIsOpen(true);
                  }}
                  $bg="#28b628"
                >
                  <BiMessageSquareEdit />
                </CustomBtn>
                <CustomBtn
                  onClick={() => {
                    setIsModalDeleteOpen(true);
                    setVideoToDeleteId(video.id);
                  }}
                  $bg="#ff5050"
                >
                  <MdOutlineDelete />
                </CustomBtn>
              </div>
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
      <EditModalForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        videoToEditId={videoToEditId}
        courseId={id}
        refreshVideosList={refreshVideosList}
      />
      <ConfirmModal
        isOpen={isModalDeleteOpen}
        onClose={() => {
          setIsModalDeleteOpen(false);
        }}
        handleOk={handleOk}
      />
    </StyledVideos>
  );
};
const CustomBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${({ $bg }) => $bg};
  color: #fff;
  font-size: var(--normal-text);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 8px;

  &:hover {
    background-color: transparent;
    color: ${({ $bg }) => $bg};
    border-color: ${({ $bg }) => $bg};
  }
`;

const StyledVideos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  @media (max-width: 1200px) {
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
  height: 50px;
  &:hover {
    background-color: white;
    color: var(--primary-shared);
    border-color: var(--primary-shared);
  }
`;
export default Course;
