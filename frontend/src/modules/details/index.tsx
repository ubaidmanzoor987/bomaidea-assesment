import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/core/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAppSelector, setIsBack } from "@/store/app";
import { HomeStyled } from "./index.styles";
import { getProjectById } from "@/services/app";
import { IProject } from "@/store/app/types";
import { useRouter } from "next/router";

const DetailsModule = () => {
  const dispatch = useDispatch();
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
    const resp = await getProjectById(userId, projectId);
    if (resp.response && resp.response.data) {
      setObj({ ...obj, data: resp.response.data });
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const onClick = (per: string) => {
    alert(per);
  };

  const onClickBack = () => {
    router.push("/");
  }

  return (
    <HomeStyled>
      <div style={{ display: "flex", columnGap: 10 }}>
        <h1 style={{cursor: "pointer"}} onClick={onClickBack}>
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
          {obj.data?.permissions?.filter((x) => x !== "Read").map((permission) => (
            <Button key={permission} onClick={() => onClick(permission)}>
              {permission}
            </Button>
          ))}
        </div>
      </div>
    </HomeStyled>
  );
};

export default DetailsModule;
