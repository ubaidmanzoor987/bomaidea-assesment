import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/core/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { allProjectsThunk, getAppSelector, setIsBack } from "@/store/app";
import { HomeStyled } from "./index.styles";
import {
  createTaskByProjectId,
  deleteProjectById,
  getProjectById,
  updateProjectById,
} from "@/services/app";
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
  const { userId, projectId } = useSelector(getAppSelector);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [errorTask, setErrorTask] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [permission, setPermission] = useState<string>("");
  const [updateData, setUpdateData] = useState<IProject>({
    name: "",
    state: "",
    date: "",
    id: "",
  });

  const [updateError, setUpdateError] = useState<any>({
    name: "",
    state: "",
    date: "",
    id: "",
  });

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
    if (per === "Update") {
      setUpdateData({
        ...obj.data,
      });
    }
  };

  const onClickBack = () => {
    router.push("/");
  };

  const onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "taskName":
        setName(value);
        break;
      case "name":
        setUpdateData({
          ...updateData,
          name: value,
        });
        break;
      case "state":
        setUpdateData({
          ...updateData,
          state: value,
        });
        break;
      case "date":
        setUpdateData({
          ...updateData,
          date: value,
        });
        break;
      default:
        break;
    }
    if (updateError[name] && updateError[name].length > 0) {
      setUpdateError({
        ...updateError,
        [name]: "",
      });
    }
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

  const updateProject = async () => {
    try {
      if (updateData.name.length === 0) {
        setUpdateError({
          ...updateError,
          name: "Name Is Required",
        });
        return;
      } else if (updateData.state.length === 0) {
        setUpdateError({
          ...updateError,
          name: "State Is Required",
        });
        return;
      } else if (updateData.date.length === 0) {
        setUpdateError({
          ...updateError,
          name: "Date Is Required",
        });
        return;
      }
      const resp = await updateProjectById(updateData, projectId, userId);
      if (resp.response && resp.response.data) {
        handleClose();
        await fetchProject();
      }
    } catch (err: any) {}
  };

  const deleteProject = async () => {
    try {
      const resp = await deleteProjectById(obj.data.id, userId);
      if (resp.response && resp.response.data) {
        handleClose();
        dispatch(allProjectsThunk({userId}));
        router.push("/");
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
        ) : permission === "Update" ? (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Project
            </Typography>
            <div style={{ marginTop: 10 }}>
              <Label>Name:</Label>
              <FieldInput
                name="name"
                style={{ marginTop: 5 }}
                onChange={onChange}
                value={updateData.name}
              />
            </div>
            <div>
              {updateError.name.length > 0 && (
                <p style={{ color: "red" }}>{updateError.name}</p>
              )}
            </div>
            <div style={{ marginTop: 10 }}>
              <Label>State:</Label>
              <FieldInput
                name="state"
                style={{ marginTop: 5 }}
                onChange={onChange}
                value={updateData.state}
              />
            </div>
            <div>
              {updateError.state.length > 0 && (
                <p style={{ color: "red" }}>{updateError.state}</p>
              )}
            </div>
            <div style={{ marginTop: 10 }}>
              <Label>Date:</Label>
              <FieldInput
                name="date"
                style={{ marginTop: 5 }}
                onChange={onChange}
                value={updateData.date}
              />
            </div>
            <div>
              {updateError.date.length > 0 && (
                <p style={{ color: "red" }}>{updateError.date}</p>
              )}
            </div>
            <div style={{ marginTop: 10 }}>
              <Button onClick={updateProject}>Update</Button>
            </div>
          </Box>
        ) : permission === "Delete" ? (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Project
            </Typography>
            <div style={{ display: "flex" }}>
              <Button onClick={deleteProject}>Delete</Button>
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
