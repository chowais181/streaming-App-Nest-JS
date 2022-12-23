import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function VideoList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [videoId] = React.useState(id);
  const [videoInfo, setVideoInfo] = React.useState([]);
  console.log(videoInfo);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`/api/v1/video?id=${videoId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setVideoInfo(data);
        setLoading(false);
      } catch {
        navigate("/");
      }
    }
    fetchData();
  }, [videoId, navigate]);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Grid item xs={12} md={12} marginTop={2}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: "flex" }}>
              <CardContent sx={{ flex: 1 }}>
                <video autoPlay controls width="60%">
                  <source src={`/api/v1/video/${videoId}`} type="video/mp4" />
                </video>
                <Typography gutterBottom variant="h4" component="div">
                  {videoInfo?.title}
                </Typography>
                <Grid container spacing={2} marginTop={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" color="primary">
                      Created by: {videoInfo?.createdBy?.fullname}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" color="primary">
                      Uploaded On: {videoInfo?.uploadDate.substring(0, 10)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      )}
    </Container>
  );
}
