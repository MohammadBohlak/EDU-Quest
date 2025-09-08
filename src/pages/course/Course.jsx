import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api/api";
import { NormalTextPrimaryShared } from "../../components/common/texts/NormalText";
import { SmallTextShared } from "../../components/common/texts/SmallText";
import EditModalForm from "../../components/coursesPageComponents/editVideoModal/EditVideoModal";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmModal from "../../components/ui/modals/confirmModal/ConfirmModal";
import { useTranslation } from "react-i18next";
import { CardImage, CustomBtn, ShowBtn, StyledVideos } from "./course.styles";
import { Card } from "react-bootstrap";
const Course = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [videoToEditId, setVideoToEditId] = useState("");
  const [videoToDeleteId, setVideoToDeleteId] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [refreshVideos, setRefreshVideos] = useState(true);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const { t } = useTranslation();
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
    const token = localStorage.getItem("token");
    // console.log("ok", videoToDeleteId);
    api
      .delete(`videos/${videoToDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
                  {t("coursePage.watch")}
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
        title={t("coursePage.confirmDelete")}
        isOpen={isModalDeleteOpen}
        onClose={() => {
          setIsModalDeleteOpen(false);
        }}
        handleOk={handleOk}
      />
    </StyledVideos>
  );
};

export default Course;
