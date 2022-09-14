import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/core/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAppSelector, setIsBack } from "@/store/app";
import { HomeStyled } from "./index.styles";
import { createTaskByProjectId, getProjectById } from "@/services/app";
import { IProject } from "@/store/app/types";
import { useRouter } from "next/router";
import Label from "@/components/core/Label";
import FieldInput from "@/components/core/FieldInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailsModule = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [errorTask, setErrorTask] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [permission, setPermission] = useState<string>("");

  const router = useRouter();
  const [obj, setObj] = useState<{
    error: string | undefined;
    data: IProject & {
      permissions: string[];
    };
  }>({
    error: "",
    data: {} as IProject & {
      permissions: string[];
    },
  });
  const { userId, projectId } = useSelector(getAppSelector);

  const fetchProject = async () => {
    try {
      const resp = await getProjectById(userId, projectId);
      if (resp.response && resp.response.data) {
        setObj({ ...obj, data: resp.response.data });
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const onClick = (per: string) => {
    handleOpen();
    setPermission(per);
  };

  const onClickBack = () => {
    router.push("/");
  };

  const onChange = (e: any) => {
    setName(e.target.value);
    if (errorTask.length > 0) {
      setErrorTask("");
    }
  };
  const createTask = async () => {
    try {
      if (name.length === 0) {
        setErrorTask("Name is Required");
        return;
      }
      const resp = await createTaskByProjectId(name, projectId, userId);
      if (resp.response && resp.response.data) {
        handleClose();
      }
    } catch (err: any) {}
  };

  return (
    <HomeStyled>
      <div style={{ display: "flex", columnGap: 10 }}>
        <h1 style={{ cursor: "pointer" }} onClick={onClickBack}>
          <ArrowBackIcon />
        </h1>
        <h1>Details</h1>
      </div>
      <div
        style={{
          display: "flex",
          width: 600,
          border: "1px solid grey",
          borderRadius: 10,
          flexDirection: "column",
        }}
      >
        <div style={{ marginRight: 15, paddingLeft: 10 }}>
          <p>Id: {obj.data?.id}</p>
          <p>Name: {obj.data?.name}</p>
          <p>State: {obj.data?.state}</p>
          <p>Date: {obj.data?.date}</p>
        </div>
        <div style={{ marginLeft: 10, display: "flex", columnGap: 10 }}>
          {obj.data?.permissions
            ?.filter((x) => x !== "Read")
            .map((permission) => (
              <Button key={permission} onClick={() => onClick(permission)}>
                {permission}
              </Button>
            ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {permission === "Create" ? (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Task
            </Typography>
            <div style={{ marginTop: 10 }}>
              <Label>Name:</Label>
              <FieldInput
                name="taskName"
                style={{ marginTop: 5 }}
                onChange={onChange}
              />
            </div>
            <div>
              {errorTask.length > 0 && (
                <p style={{ color: "red" }}>{errorTask}</p>
              )}
            </div>

            <div style={{ marginTop: 10 }}>
              <Button onClick={createTask}>Create Task</Button>
            </div>
          </Box>
        ) : (
          <></>
        )}
      </Modal>
    </HomeStyled>
  );
};

export default DetailsModule;
